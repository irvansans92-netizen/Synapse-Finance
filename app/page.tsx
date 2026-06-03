"use client";
import { useState } from "react";
import { BrowserProvider, Contract, parseEther } from "ethers";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { 
  Home, Box, ArrowDownCircle, ArrowUpCircle, BarChart2, 
  ArrowLeftRight, History, Settings, Bell, ChevronDown, 
  Lock, Wallet, TrendingUp, ShieldCheck, BookOpen 
} from "lucide-react";

const chartData = [
  { name: 'May 26', value: 5000 }, { name: 'May 27', value: 7200 }, 
  { name: 'May 28', value: 9500 }, { name: 'May 29', value: 8900 }, 
  { name: 'May 30', value: 10500 }, { name: 'May 31', value: 10100 }, 
  { name: 'Jun 1', value: 12000 }, { name: 'Jun 2', value: 12540 }
];

export default function Dashboard() {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(`${address.substring(0, 6)}...${address.substring(38)}`);
    } else {
      alert("Metamask tidak ditemukan!");
    }
  };

  const handleDeposit = async () => {
    if (!amount || Number(amount) <= 0) return alert("Masukkan jumlah valid");
    setIsProcessing(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract("0x3DcD261Df413000E07198C54583155F6781F161f", ["function deposit() payable"], signer);
      const tx = await contract.deposit({ value: parseEther(amount) });
      await tx.wait();
      alert("Deposit Berhasil!");
      setAmount("");
    } catch (error) {
      console.error(error);
    }
    setIsProcessing(false);
  };

  return (
    <div className="flex min-h-screen bg-[#0B0E14] text-white font-sans overflow-hidden">
      
      {/* LEFT SIDEBAR (Hidden on Mobile) */}
      <aside className="w-64 bg-[#131722] border-r border-[#1E2330] hidden lg:flex flex-col justify-between p-6 h-screen overflow-y-auto">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-xl">S</div>
            <h1 className="text-xl font-bold tracking-wide">SYNAPSE<br/><span className="text-[10px] text-blue-400 font-normal tracking-widest">FINANCE</span></h1>
          </div>
          <nav className="space-y-2 text-sm">
            <div className="bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer"><Home size={18} /> Dashboard</div>
            <div className="text-gray-400 hover:text-white px-4 py-3 flex items-center gap-3 cursor-pointer"><Box size={18} /> Vault</div>
            <div className="text-gray-400 hover:text-white px-4 py-3 flex items-center gap-3 cursor-pointer"><ArrowDownCircle size={18} /> Deposit</div>
            <div className="text-gray-400 hover:text-white px-4 py-3 flex items-center gap-3 cursor-pointer"><ArrowUpCircle size={18} /> Withdraw</div>
            <div className="text-gray-400 hover:text-white px-4 py-3 flex items-center gap-3 cursor-pointer"><BarChart2 size={18} /> Analytics</div>
            <div className="text-gray-400 hover:text-white px-4 py-3 flex items-center gap-3 cursor-pointer"><ArrowLeftRight size={18} /> Transactions</div>
            <div className="text-gray-400 hover:text-white px-4 py-3 flex items-center gap-3 cursor-pointer"><History size={18} /> History</div>
            <div className="text-gray-400 hover:text-white px-4 py-3 flex items-center gap-3 cursor-pointer"><Settings size={18} /> Settings</div>
          </nav>
        </div>
        <div className="bg-[#1A1F2E] p-5 rounded-xl border border-[#1E2330] mt-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/20 blur-xl rounded-full"></div>
          <h4 className="font-bold mb-1 z-10 relative">Built on OPN</h4>
          <p className="text-xs text-gray-400 mb-4 z-10 relative">Secure. Decentralized.<br/>Open for everyone.</p>
          <div className="flex items-center gap-2 text-xs text-green-400 bg-green-400/10 w-max px-3 py-1.5 rounded-full z-10 relative">
            <div className="w-2 h-2 rounded-full bg-green-500"></div> OPN Testnet
          </div>
        </div>
      </aside>

      {/* MIDDLE MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-8 h-screen overflow-y-auto custom-scrollbar">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome back, Irvan 👋</h2>
            <p className="text-gray-400 text-sm">Here's what's happening with your vault today.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative bg-[#131722] p-2.5 rounded-full border border-[#1E2330] hover:border-gray-600 transition-colors">
              <Bell size={20} className="text-gray-300" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 rounded-full text-[9px] flex items-center justify-center border-2 border-[#131722]">3</span>
            </button>
            <button onClick={connectWallet} className="bg-[#131722] border border-[#1E2330] hover:border-blue-500 px-4 py-2 rounded-full flex items-center gap-3 transition-all">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"></div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold leading-tight">{account ? account : "Connect Wallet"}</p>
                <p className="text-[10px] text-gray-400">{account ? "Connected" : "Not connected"}</p>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
          </div>
        </header>

        {/* STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Value Locked" amount="12,540" icon={<Lock size={20} className="text-blue-400"/>} perc="+ 12.5%" />
          <StatCard title="Your Balance" amount="250.00" icon={<Wallet size={20} className="text-purple-400"/>} perc="— 0.0%" color="text-gray-400" active />
          <StatCard title="Yield Earned (All Time)" amount="43.25" icon={<TrendingUp size={20} className="text-green-400"/>} perc="+ 8.7%" />
          <div className="bg-[#131722] p-5 rounded-2xl border border-[#1E2330]">
            <div className="flex justify-between items-start mb-4">
              <p className="text-gray-400 text-sm">Vault Health</p>
              <ShieldCheck size={20} className="text-green-400"/>
            </div>
            <h3 className="text-2xl font-bold mb-1">98<span className="text-lg text-gray-400">%</span></h3>
            <p className="text-green-400 text-xs mb-4">Very Healthy</p>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-green-400 w-[98%] h-full"></div>
            </div>
          </div>
        </div>

        {/* CHART SECTION */}
        <div className="bg-[#131722] p-6 rounded-2xl border border-[#1E2330] mb-6 relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">Portfolio Overview</h3>
            <div className="flex bg-[#0B0E14] rounded-lg p-1 text-xs font-medium border border-[#1E2330]">
              <button className="px-3 py-1 bg-[#1A1F2E] rounded-md shadow">7D</button>
              <button className="px-3 py-1 text-gray-400 hover:text-white">30D</button>
              <button className="px-3 py-1 text-gray-400 hover:text-white">90D</button>
              <button className="px-3 py-1 text-gray-400 hover:text-white">All</button>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}K`} />
                <Tooltip contentStyle={{ backgroundColor: '#1A1F2E', border: 'none', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#3B82F6', stroke: '#0B0E14', strokeWidth: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-[#131722] p-6 rounded-2xl border border-[#1E2330]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Recent Activity</h3>
            <button className="text-blue-500 text-sm hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            <ActivityRow type="Deposit" amount="+ 50.00 OPN" time="2 mins ago" hash="0x8fa...ce21" icon={<ArrowDownCircle className="text-green-500" size={20}/>} />
            <ActivityRow type="Yield Earned" sub="Protocol" amount="+ 5.20 OPN" time="1 hour ago" hash="0x7ab...f3e1" icon={<TrendingUp className="text-blue-500" size={20}/>} />
            <ActivityRow type="Withdraw" amount="- 20.00 OPN" time="2 days ago" hash="0x9e1...a2f4" icon={<ArrowUpCircle className="text-red-500" size={20}/>} color="text-red-400" />
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR (Wallet & Interaction) */}
      <aside className="w-80 bg-[#0B0E14] border-l border-[#1E2330] p-6 hidden xl:flex flex-col gap-6 overflow-y-auto">
        <div className="bg-[#131722] rounded-2xl p-6 border border-[#1E2330]">
          <h3 className="font-bold mb-4">Your Wallet</h3>
          <p className="text-sm text-gray-400 mb-1">Wallet Balance</p>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-3xl font-bold">250.00 <span className="text-lg text-gray-400">OPN</span></h2>
              <p className="text-sm text-gray-500">≈ $25.00 USD</p>
            </div>
            <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-r-transparent rotate-45"></div>
          </div>
          
          <div className="bg-[#0B0E14] p-3 rounded-xl mb-4 border border-[#1E2330] flex items-center">
            <input 
              type="number" 
              placeholder="0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent outline-none w-full text-lg font-bold"
            />
            <span className="text-gray-400 font-bold px-2">OPN</span>
          </div>

          <button onClick={handleDeposit} disabled={isProcessing} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-3.5 rounded-xl font-bold mb-3 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all">
            <ArrowDownCircle size={20} /> {isProcessing ? "Processing..." : "Deposit"}
          </button>
          <button className="w-full bg-[#1A1F2E] hover:bg-[#252B3D] text-gray-300 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
            <ArrowUpCircle size={20} /> Withdraw
          </button>
        </div>

        <div className="bg-[#131722] rounded-2xl p-6 border border-[#1E2330]">
          <h3 className="font-bold mb-4">Vault Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-400">Strategy</span><span className="text-blue-400">Auto-Compound</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Performance Fee</span><span>10%</span></div>
            <div className="flex justify-between"><span className="text-gray-400">TVL Cap</span><span>100,000 OPN</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Current Utilization</span><span>12.54%</span></div>
          </div>
        </div>
        
        <div className="bg-blue-900/20 border border-blue-800/30 rounded-2xl p-5 flex gap-4 items-center">
          <ShieldCheck className="text-blue-400" size={32} />
          <div>
            <h4 className="font-bold text-sm">Powered by Smart Contracts</h4>
            <p className="text-[11px] text-gray-400 mt-1">Transparent. Secure. Decentralized.</p>
          </div>
        </div>
      </aside>

    </div>
  );
}

function StatCard({ title, amount, icon, perc, color = "text-green-400", active = false }: any) {
  return (
    <div className={`bg-[#131722] p-5 rounded-2xl border ${active ? 'border-b-4 border-blue-600 border-x-[#1E2330] border-t-[#1E2330]' : 'border-[#1E2330]'} relative overflow-hidden group`}>
      <div className="flex justify-between items-start mb-4">
        <p className="text-gray-400 text-sm flex items-center gap-2">{title}</p>
        <div className="bg-[#1A1F2E] p-2 rounded-lg">{icon}</div>
      </div>
      <h3 className="text-2xl font-bold mb-1">{amount} <span className="text-sm text-gray-500 font-normal">OPN</span></h3>
      <p className={`${color} text-xs mt-3`}>{perc} vs last 7 days</p>
    </div>
  );
}

function ActivityRow({ type, sub, amount, time, hash, icon, color = "text-green-400" }: any) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#1A1F2E] last:border-0">
      <div className="flex items-center gap-4">
        <div className="bg-[#1A1F2E] p-2 rounded-full">{icon}</div>
        <div>
          <h4 className="font-medium text-sm">{type}</h4>
          <p className="text-xs text-gray-500">{sub || `From ${hash}`}</p>
        </div>
      </div>
      <div className="text-right">
        <h4 className={`font-medium text-sm ${color}`}>{amount}</h4>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}

