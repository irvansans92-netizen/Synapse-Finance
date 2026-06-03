"use client";
import { useState } from "react";
import { BrowserProvider, Contract, parseEther } from "ethers";

export default function Home() {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const contractAddress = "0x3DcD261Df413000E07198C54583155F6781F161f";
  
  const abi = [
    { "inputs": [], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function" },
    { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "shares", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }
  ];

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(`${address.substring(0, 6)}...${address.substring(38)}`);
      } catch (error) {
        console.error("Koneksi ditolak", error);
      }
    } else {
      alert("Metamask tidak ditemukan di browser ini!");
    }
  };

  const handleDeposit = async () => {
    if (!amount || Number(amount) <= 0) return alert("Masukkan jumlah valid");
    setIsProcessing(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, abi, signer);
      
      const tx = await contract.deposit({ value: parseEther(amount) });
      await tx.wait();
      alert("Deposit Berhasil!");
      setAmount("");
    } catch (error) {
      console.error(error);
      alert("Transaksi gagal");
    }
    setIsProcessing(false);
  };

  return (
    <div className="flex min-h-screen bg-[#0B0E14] text-white font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#131722] border-r border-gray-800 hidden md:flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">S</div>
            <h1 className="text-xl font-bold tracking-wide">SYNAPSE<br/><span className="text-xs text-blue-400 font-normal">FINANCE</span></h1>
          </div>
          <nav className="space-y-2">
            <div className="bg-blue-600/20 text-blue-400 px-4 py-3 rounded-lg font-medium cursor-pointer">Dashboard</div>
            <div className="text-gray-400 hover:text-white px-4 py-3 rounded-lg cursor-pointer">Vault</div>
            <div className="text-gray-400 hover:text-white px-4 py-3 rounded-lg cursor-pointer">Analytics</div>
          </nav>
        </div>
        <div className="bg-[#1A1F2E] p-4 rounded-xl border border-gray-800">
          <p className="text-xs text-gray-400 mb-1">Built on</p>
          <p className="font-bold text-blue-400">OPN Testnet</p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-1">Welcome back, Irvan 👋</h2>
            <p className="text-gray-400 text-sm">Here's what's happening with your vault today.</p>
          </div>
          <button 
            onClick={connectWallet} 
            className="bg-[#1A1F2E] border border-gray-700 hover:border-blue-500 px-5 py-2.5 rounded-full flex items-center gap-2 transition-all"
          >
            <div className={`w-2.5 h-2.5 rounded-full ${account ? 'bg-green-500' : 'bg-red-500'}`}></div>
            {account ? account : "Connect Wallet"}
          </button>
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#131722] p-6 rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-sm mb-2">Total Value Locked</p>
            <h3 className="text-3xl font-bold">12,540 <span className="text-lg text-gray-500 font-normal">OPN</span></h3>
            <p className="text-green-400 text-sm mt-4">↗ 12.5% vs last 7 days</p>
          </div>
          <div className="bg-[#131722] p-6 rounded-2xl border border-gray-800 border-b-4 border-b-blue-600">
            <p className="text-gray-400 text-sm mb-2">Your Balance</p>
            <h3 className="text-3xl font-bold">250.00 <span className="text-lg text-gray-500 font-normal">OPN</span></h3>
            <p className="text-gray-500 text-sm mt-4">— 0.0% vs last 7 days</p>
          </div>
          <div className="bg-[#131722] p-6 rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-sm mb-2">Yield Earned (All Time)</p>
            <h3 className="text-3xl font-bold">43.25 <span className="text-lg text-gray-500 font-normal">OPN</span></h3>
            <p className="text-green-400 text-sm mt-4">↗ 8.7% vs last 7 days</p>
          </div>
        </div>

        {/* INTERACTION AREA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#131722] p-6 rounded-2xl border border-gray-800 h-64 flex items-center justify-center text-gray-500">
            [ Area Grafik Portfolio Overview Akan Ditambahkan di Sini ]
          </div>
          
          {/* DEPOSIT BOX */}
          <div className="bg-[#131722] p-6 rounded-2xl border border-gray-800">
            <h4 className="font-bold mb-4">Quick Deposit</h4>
            <div className="bg-[#0B0E14] p-4 rounded-xl border border-gray-800 mb-4 flex justify-between items-center">
              <input 
                type="number" 
                placeholder="0.00" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent outline-none text-2xl w-2/3"
              />
              <span className="font-bold text-gray-400">OPN</span>
            </div>
            <button 
              onClick={handleDeposit} 
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Deposit to Vault"}
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}

