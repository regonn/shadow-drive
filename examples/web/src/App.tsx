import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
	GlowWalletAdapter,
	PhantomWalletAdapter,
	SlopeWalletAdapter,
	SolflareWalletAdapter,
	TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo } from 'react';
import Drive from './Drive';

export const App: FC = () => {
	return (
		<Context>
			<Content />
			<Drive></Drive>
		</Context>
	);
};

const Context: FC<{ children: ReactNode }> = ({ children }) => {
	// The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
	const network = 'https://ssc-dao.genesysgo.net/';
	// @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
	// Only the wallets you configure here will be compiled into your application, and only the dependencies
	// of wallets that your users connect to will be loaded.
	const wallets = useMemo(
		() => [
			new PhantomWalletAdapter(),
			new GlowWalletAdapter(),
			new SlopeWalletAdapter(),
			// new SolflareWalletAdapter({ network }),
			new TorusWalletAdapter(),
		],
		[network]
	);

	return (
		<ConnectionProvider endpoint={network} config={{ commitment: 'max' }}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
};

const Content: FC = () => {
	return <div><WalletMultiButton /></div>
};
