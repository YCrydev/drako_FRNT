import { Connection } from "@solana/web3.js";

export const retry = async <T>(
  fn: () => Promise<T>,
  retriesLeft = 5,
  interval = 1000,
  intervalMultiplier = 2
): Promise<any> => {
  try {
    return await fn();
  } catch (error: any) {
    if (retriesLeft) {
      await new Promise((r) => setTimeout(r, interval));
      return await retry(fn, retriesLeft - 1, interval * intervalMultiplier);
    } else {
      return null;
    }
  }
};

export const confirmTransactions = async (
  serializedTransactions: Uint8Array[],
  connection: Connection
): Promise<string[]> => {
  const signatures = [];
  for (const serializedTxn of serializedTransactions) {
    // send the transaction
    const signature = await retry(
      async () => {
        const sig = await connection.sendRawTransaction(serializedTxn);

        return sig;
      },
      5,
      1000,
      2
    );

    // make sure the signature is valid
    const parsedTxn = await retry(async () => {
      const txn = await connection.getParsedTransaction(signature, {
        maxSupportedTransactionVersion: 0,
        commitment: "confirmed",
      });

      if (!txn) {
        throw new Error("parsed txn not found");
      }

      return txn;
    }, 3);

    if (!parsedTxn) {
      continue;
    }

    signatures.push(signature);
  }

  return signatures;
};
