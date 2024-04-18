import { Connection, Keypair } from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata-alpha";
import fs from "fs";
import { keypairIdentity } from "@metaplex-foundation/umi";

type UmiOptions = {
  privateKeyPath?: string;
  //not yet implemented lol
  privateKey?: Keypair;
};

export const umiClient = (env: string, options: UmiOptions) => {
  const connection = new Connection(
    env == "prod"
      ? `https://global.rpc.hellomoon.io/${process.env.API_KEY}`
      : "https://devnet.helius-rpc.com/?api-key=6fcd2543-b110-4a64-b2fb-5a57662e188f"
  );
  let umi = createUmi(connection.rpcEndpoint);
  umi.use(mplTokenMetadata());
  if (options.privateKeyPath) {
    let secretKey = new Uint8Array(
      JSON.parse(fs.readFileSync(options.privateKeyPath, "utf-8"))
    );
    let keyPair = umi.eddsa.createKeypairFromSecretKey(secretKey);
    umi.use(keypairIdentity(keyPair));
  }
  if (options.privateKey) {
    let keyPair = umi.eddsa.createKeypairFromSecretKey(
      options.privateKey.secretKey
    );
    umi.use(keypairIdentity(keyPair));
  }
  return umi;
};
