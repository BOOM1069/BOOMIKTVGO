import React, { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';

// --- ICONS ---
const Play = ({ size = 24, fill = "none", className = "" }) => ( <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3"/></svg> );
const Pause = ({ size = 24, fill = "none", className = "" }) => ( <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> );
const RadioIcon = ({ size = 24, className = "" }) => ( <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg> );
const Volume2 = ({ size = 24, className = "" }) => ( <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> );
const X = ({ size = 24, className = "" }) => ( <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> );
const Menu = ({ size = 24, className = "" }) => ( <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg> );
const Send = ({ size = 24, className = "" }) => ( <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> );
const Lock = ({ size = 24, className = "" }) => ( <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> );
const DollarSign = ({ size = 24, className = "" }) => ( <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> );
const ArrowLeft = ({ size = 24, className = "" }) => ( <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg> );
const Instagram = ({ size = 24, className = "" }) => ( <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> );
const Facebook = ({ size = 24, className = "" }) => ( <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> );

// --- DATA ---
const mediaData = {
    omg: [
        { id: 'omg-feb2', title: 'OMG: Feb 2, 2026', thumbnail: 'https://img.youtube.com/vi/AA1fS15h0r4/hqdefault.jpg', type: 'youtube', videoUrl: 'AA1fS15h0r4' },
        { id: 'omg-jan30', title: 'OMG: Jan 30, 2026', thumbnail: 'https://img.youtube.com/vi/tijeiP8GTvw/hqdefault.jpg', type: 'youtube', videoUrl: 'tijeiP8GTvw' },
        { id: 'omg-jan29', title: 'OMG: Jan 29, 2026', thumbnail: 'https://img.youtube.com/vi/GNx1B5GW-8I/hqdefault.jpg', type: 'youtube', videoUrl: 'GNx1B5GW-8I' },
        { id: 'omg-jan28', title: 'OMG: Jan 28, 2026', thumbnail: 'https://img.youtube.com/vi/y_CjjXfB0m0/hqdefault.jpg', type: 'youtube', videoUrl: 'y_CjjXfB0m0' }
    ],
    iktvOriginals: [
        { id: 'orig-1', title: 'ON THE RISE: S1 EP 1', thumbnail: 'https://img.youtube.com/vi/y_CjjXfB0m0/hqdefault.jpg', type: 'youtube', videoUrl: 'y_CjjXfB0m0' },
        { id: 'orig-2', title: 'ON THE RISE: S1 EP 2', thumbnail: 'https://img.youtube.com/vi/2aqFRpycs3Q/hqdefault.jpg', type: 'youtube', videoUrl: '2aqFRpycs3Q' },
        { id: 'orig-3', title: 'DECISION 25: EPISODE 3', thumbnail: 'https://img.youtube.com/vi/QdKERdsLEso/hqdefault.jpg', type: 'youtube', videoUrl: 'QdKERdsLEso' },
        { id: 'orig-4', title: 'BOOM 106.9 ANNIVERSARY', thumbnail: 'https://img.youtube.com/vi/Gt-rcYRvyKQ/hqdefault.jpg', type: 'youtube', videoUrl: 'Gt-rcYRvyKQ' }
    ],
    team: [
        { id: 't1', name: 'Bing', role: 'OMG IN THE MORNING (6-10AM)', image: '/team/Bing.jpg', bio: 'The Real Badman of Radio. Catch Bing and DJ Shady from 6 till 10 on OMG in the Morning, the most insane morning show in SVG.' },
        { id: 't2', name: 'Millenium Kidd', role: 'MID MORNING (10AM-1PM)', image: '/team/mkidd.jpg', bio: 'Holding down the Mid Morning vibes from 10 till 1 with the smoothest selections.' },
        { id: 't_jill', name: 'Jill', role: 'DISTRICT 106 (1-4PM)', image: '/team/jill.jpg', bio: 'Taking you through the afternoon on District 106. The perfect blend of energy and hits.' },
        { id: 't3', name: 'Domo', role: 'THE BOOM DRIVE (4-7PM)', image: '/team/Domo-2.png', bio: 'Driving you home with the biggest hits. Catch Domo on the Boom Drive and Friday mornings.' },
        { id: 't_samo', name: 'DJ Samo', role: 'THE BOOM DRIVE / VIBE CHECK', image: '/team/samo.jpg', bio: 'Co-pilot of The Boom Drive and keeping the energy high on Vibe Check Saturdays.' },
        { id: 't_lano', name: 'DJ Lano', role: 'CELEBRITY SATURDAY / SUNDAY VIBES', image: '/team/lano.jpg', bio: 'Your weekend warrior taking over Celebrity Saturdays and Sunday Vibes.' },
        { id: 't4', name: 'Supa Dog Pitbull', role: 'WEEKENDS', image: '/team/Pitbull.png', bio: 'Taking over your weekend with State of Saturdays and Sunday vibes.' },
        { id: 't5', name: 'Yung Source', role: 'FRIDAY MORNINGS', image: '/team/Yung Source.png', bio: 'High energy mixmaster keeping the island vibes alive.' },
        { id: 't6', name: 'Swagga', role: 'ON AIR TALENT', image: '/team/Swagga.JPG', bio: 'Bringing the style and the latest hits to every session.' },
        { id: 't7', name: 'Spaceboy', role: 'ON AIR TALENT', image: '/team/Spaceboy.jpg', bio: 'The technical wizard behind the scenes and a powerhouse on the mic.' },
        { id: 't8', name: 'Javed', role: 'ON AIR TALENT', image: '/team/Javed.png', bio: 'Part of the elite team bringing you the best in media.' },
        { id: 't9', name: 'Jayden', role: 'ON AIR TALENT', image: '/team/Jayden.jpg', bio: 'Young talent bringing fresh energy to the Boom/IKTV network.' },
        { id: 't_puncha', name: 'Puncha', role: 'ON AIR TALENT', image: '/team/puncha.jpg', bio: 'Bringing the punch and energy to the airwaves.' },
        { id: 't_tia', name: 'Tia', role: 'ON AIR TALENT', image: '/team/tia.jpg', bio: 'Representing the ladies with style and grace on Boom 106.9.' }
    ],
    partners: [
        { id: 'p1', name: 'Digicel', logo: 'https://placehold.co/400x200/black/orange?text=Digicel' },
        { id: 'p2', name: 'Hairoun Beer', logo: 'https://placehold.co/400x200/black/orange?text=Hairoun' },
        { id: 'p3', name: 'Sunset Rum', logo: 'https://placehold.co/400x200/black/orange?text=Sunset+Rum' }
    ]
};

const fullSchedule = [
    { day: 'MON - THU', shows: [
        { time: '6AM - 10AM', name: 'OMG IN THE MORNING', host: 'Bing & DJ Shady' },
        { time: '10AM - 1PM', name: 'MILLENNIUM MORNINGS', host: 'Millenium Kidd' },
        { time: '1PM - 4PM', name: 'DISTRICT 106', host: 'Jill' },
        { time: '4PM - 7PM', name: 'THE BOOM DRIVE', host: 'Domo & DJ Samo' },
        { time: '7PM - 6AM', name: 'NO MIC NIGHTTIME', host: 'Boom Selection' }
    ]},
    { day: 'FRIDAY', shows: [
        { time: '6AM - 9AM', name: 'OMG FRIDAY', host: 'Da Fugitive & DJ Shady' },
        { time: '9AM - 12PM', name: 'BOOM BLAST', host: 'Domo & DJ Source' },
        { time: '12PM - 3PM', name: 'AFTERNOON MIX', host: 'DJ Laza & DJ Babajay' },
        { time: '3PM - 6PM', name: 'WEEKEND WARMUP', host: 'DJ Tucker & Chris John' },
        { time: '6PM - 9PM', name: 'KINGS OF THE NIGHT', host: 'Weapon R & Dr King' },
        { time: '9PM - MID', name: 'NO MIC WEEKEND', host: 'Boom Selection' }
    ]},
    { day: 'SATURDAY', shows: [
        { time: '9AM - 12PM', name: 'CELEBRITY SATURDAY', host: 'Supa Dog & DJ Lano' },
        { time: '12PM - 3PM', name: 'AFTERNOON BLAST', host: 'Chris John & DJ Babajay' },
        { time: '3PM - 6PM', name: 'VIBE CHECK', host: 'DJ Samo & DJ Lazer' },
        { time: '6PM - 9PM', name: 'KINGS OF THE NIGHT', host: 'Weapon R & Dr King' },
        { time: '9PM - MID', name: 'NO MIC WEEKEND', host: 'Boom Selection' }
    ]},
    { day: 'SUNDAY', shows: [
        { time: '12PM - 3PM', name: 'SUPA DOG PITBULL', host: 'Supa Dog Pitbull' },
        { time: '3PM - 6PM', name: 'SUNDAY VIBES', host: 'Da Fugitive & DJ Lano' },
        { time: '6PM - 9PM', name: 'THE LOVE ZONE', host: 'Boom Selection' },
        { time: '9PM - MID', name: 'NO MIC SUNDAY', host: 'Boom Selection' }
    ]}
];

// --- HELPER FUNCTIONS ---
const getLiveShowInfo = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const astDate = new Date(utc + (3600000 * -4)); // UTC-4
    const day = astDate.getDay();
    const hour = astDate.getHours();

    if (day >= 1 && day <= 4) {
        if (hour >= 6 && hour < 10) return { show: "OMG IN THE MORNING", host: "Bing Smoke & DJ Shady" };
        if (hour >= 10 && hour < 13) return { show: "MILLENNIUM MORNINGS", host: "Millenium Kidd" };
        if (hour >= 13 && hour < 16) return { show: "DISTRICT 106", host: "Jill" };
        if (hour >= 16 && hour < 19) return { show: "THE BOOM DRIVE", host: "Domo & DJ Samo" };
        return { show: "NO MIC NIGHTTIME", host: "Boom Selection" };
    } else if (day === 5) {
        if (hour >= 6 && hour < 9) return { show: "OMG FRIDAY", host: "Da Fugitive & DJ Shady" };
        if (hour >= 9 && hour < 12) return { show: "BOOM BLAST", host: "Domo & DJ Source" };
        if (hour >= 12 && hour < 15) return { show: "AFTERNOON MIX", host: "DJ Laza & DJ Babajay" };
        if (hour >= 15 && hour < 18) return { show: "WEEKEND WARMUP", host: "DJ Tucker & Chris John" };
        if (hour >= 18 && hour < 21) return { show: "KINGS OF THE NIGHT", host: "Weapon R & Dr King" };
        return { show: "NO MIC WEEKEND", host: "Boom Selection" };
    } else if (day === 6) {
        if (hour >= 9 && hour < 12) return { show: "CELEBRITY SATURDAY", host: "Supa Dog Pitbull & DJ Lano" };
        if (hour >= 12 && hour < 15) return { show: "AFTERNOON BLAST", host: "Chris John & DJ Babajay" };
        if (hour >= 15 && hour < 18) return { show: "VIBE CHECK", host: "DJ Samo & DJ Lazer" };
        if (hour >= 18 && hour < 21) return { show: "KINGS OF THE NIGHT", host: "Weapon R & Dr King" };
        return { show: "NO MIC WEEKEND", host: "Boom Selection" };
    } else if (day === 0) {
        if (hour >= 12 && hour < 15) return { show: "SUPA DOG PITBULL", host: "Supa Dog Pitbull" };
        if (hour >= 15 && hour < 18) return { show: "SUNDAY VIBES", host: "Da Fugitive & DJ Lano" };
        if (hour >= 18 && hour < 21) return { show: "THE LOVE ZONE", host: "Boom Selection" };
        return { show: "NO MIC SUNDAY", host: "Boom Selection" };
    }
    return { show: "BOOM 106.9 FM", host: "The Trending Station" };
};

// --- COMPONENTS ---
const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { user: 'SupaDog101', text: 'Boom 106 locked in! 🔥' },
        { user: 'VincyVibes', text: 'Big up Bing and Shady!' },
        { user: 'IslandGirl', text: 'This mix is pure fire! SVG to the world 🇻🇨' }
    ]);
    const [input, setInput] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        if(!input.trim()) return;
        setMessages([...messages, { user: 'You', text: input }]);
        setInput('');
    };

    return (
        <div className="flex flex-col h-full bg-zinc-900/80 border-l border-white/10">
            <div className="p-4 border-b border-white/10 bg-black/50">
                <h3 className="font-black italic uppercase text-orange-500">LIVE CHAT</h3>
                <p className="text-[10px] text-gray-400">Welcome to the inner circle.</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                    <div key={i} className="flex flex-col">
                        <span className={`text-[10px] font-bold ${msg.user === 'You' ? 'text-orange-500' : 'text-blue-400'}`}>{msg.user}</span>
                        <span className="text-sm text-gray-200">{msg.text}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="p-4 border-t border-white/10 bg-black">
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Say something..." 
                        className="flex-1 bg-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <button type="submit" className="bg-orange-500 text-black p-2 rounded-lg hover:bg-white transition-colors">
                        <Send size={16} />
                    </button>
                </div>
            </form>
        </div>
    );
};

const VideoPlayer = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let hls: Hls | null = null;

        if (Hls.isSupported()) {
            hls = new Hls({ 
                debug: false,
                enableWorker: true,
                lowLatencyMode: true
            });
            hls.loadSource(src);
            hls.attachMedia(video);
            
            hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                setStatus("ready");
                // Muted autoplay usually works
                video.muted = true;
                video.play().catch(e => console.log("Autoplay prevent:", e));
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    console.error("HLS Fatal Error:", data);
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.log("Network error, trying to recover...");
                            hls?.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.log("Media error, trying to recover...");
                            hls?.recoverMediaError();
                            break;
                        default:
                            setStatus("error");
                            hls?.destroy();
                            break;
                    }
                }
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Native HLS (Safari/iOS)
            video.src = src;
            video.addEventListener('loadedmetadata', () => {
                setStatus("ready");
                video.play().catch(e => console.log("Autoplay prevent:", e));
            });
            video.addEventListener('error', () => {
                setStatus("error");
            });
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [src]);

    return (
        <div className="relative w-full h-full bg-black flex items-center justify-center group">
            <video 
                ref={videoRef} 
                className="w-full h-full object-contain" 
                poster="/studio.JPG" 
                playsInline
                crossOrigin="anonymous" // IMPORTANT: Fixes some CORS issues
                controls
            ></video>

            <div className="absolute top-4 left-4 flex items-center gap-2 z-20 pointer-events-none">
                <div className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded animate-pulse">
                    LIVE SIGNAL
                </div>
                {status === 'error' && (
                    <div className="bg-zinc-800 text-red-400 text-[10px] font-bold px-2 py-1 rounded border border-red-500">
                        OFFLINE / CONNECTING...
                    </div>
                )}
            </div>
        </div>
    );
};

const LiveSection = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // *** MUX CONFIGURATION ***
    // ID from your screenshot:
    const PLAYBACK_ID = "eXvZC91tozfiUs58CKpi1d4P6ebdp00LodsPLguok2dg"; 
    const STREAM_URL = `https://stream.mux.com/${PLAYBACK_ID}.m3u8`;

    if (!isLoggedIn) {
        return (
            <div className="h-[80vh] w-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/studio.JPG" className="w-full h-full object-cover opacity-30 blur-sm" alt="Studio Background"/>
                </div>
                <div className="relative z-10 bg-black/80 p-10 rounded-3xl border border-orange-500/30 text-center max-w-md mx-4 shadow-2xl backdrop-blur-xl">
                    <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20">
                        <Lock size={32} className="text-black" />
                    </div>
                    <h2 className="text-3xl font-black italic uppercase text-white mb-2">Members Only</h2>
                    <p className="text-gray-400 mb-8">Access the exclusive high-quality live stream, chat with the DJs, and go behind the scenes.</p>
                    <button onClick={() => setIsLoggedIn(true)} className="w-full bg-white text-black font-black uppercase italic py-4 rounded-xl hover:bg-orange-500 hover:scale-105 transition-all mb-4">
                        Member Login
                    </button>
                    <button className="text-orange-500 text-sm font-bold hover:text-white transition-colors">Create an Account</button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[85vh] w-full flex flex-col md:flex-row pt-20">
            <div className="flex-1 bg-black relative">
                <VideoPlayer src={STREAM_URL} />
            </div>
            <div className="w-full md:w-80 h-1/3 md:h-full border-t md:border-t-0 border-l border-white/10">
                <ChatInterface />
            </div>
        </div>
    );
};

const App = () => {
    const [currentPage, setCurrentPage] = useState('home'); 
    const [selectedMember, setSelectedMember] = useState(null);
    const [isRadioVisible, setIsRadioVisible] = useState(false);
    const [activeMedia, setActiveMedia] = useState(null);
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);
    const [liveInfo, setLiveInfo] = useState({ show: "BOOM 106.9 FM", host: "The Trending Station" });
    const [activeScheduleTab, setActiveScheduleTab] = useState(0);

    useEffect(() => {
        const update = () => setLiveInfo(getLiveShowInfo());
        update();
        const interval = setInterval(update, 60000);
        return () => clearInterval(interval);
    }, []);

    const navigateTo = (page, member = null) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
        if (member) setSelectedMember(member);
    };

    const handleMediaSelect = (item) => {
        setActiveMedia(item);
        setIsPlayerOpen(true);
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500 selection:text-black overflow-x-hidden">
            <Header onListenLive={() => setIsRadioVisible(true)} onNav={navigateTo} currentPage={currentPage} />
            <main className="relative">
                {currentPage === 'home' && (
                    <React.Fragment>
                        <Hero onPlay={() => navigateTo('tv')} />
                        <div className="relative z-20 -mt-20 md:-mt-32 space-y-12 pb-32">
                            <MediaRow title="OMG IN THE MORNING" items={mediaData.omg} onSelect={handleMediaSelect} />
                            <TeamRow title="MEET THE TEAM" items={mediaData.team} onMemberClick={(m) => navigateTo('team', m)} />
                            <MediaRow title="IKTV ORIGINALS" items={mediaData.iktvOriginals} onSelect={handleMediaSelect} />
                        </div>
                    </React.Fragment>
                )}
                {currentPage === 'live' && (
                    <LiveSection />
                )}
                {currentPage === 'tv' && (
                    <div className="pt-32 px-4 md:px-12 pb-32 max-w-[1800px] mx-auto animate-in fade-in duration-500">
                        <h1 className="text-4xl md:text-6xl font-black italic uppercase mb-8 border-l-8 border-orange-500 pl-6 text-white">IKTV <span className="text-orange-500">LIVE</span></h1>
                        <div className="aspect-video w-full bg-zinc-900 rounded-[50px] overflow-hidden shadow-2xl border border-white/5">
                            <iframe src={`https://player.twitch.tv/?channel=iktv112svg&parent=${window.location.hostname}`} className="w-full h-full" allowFullScreen />
                        </div>
                    </div>
                )}
                {currentPage === 'radio' && (
                    <div className="pt-32 px-4 md:px-12 pb-32 max-w-[1800px] mx-auto animate-in fade-in duration-500">
                        <h1 className="text-4xl md:text-8xl font-black italic uppercase mb-12 text-orange-500 tracking-tighter leading-none">BOOM 106.9 FM</h1>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 bg-gradient-to-br from-orange-500 to-orange-600 p-10 md:p-16 rounded-[50px] text-black shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 z-0">
                                    <img src="/studio.JPG" className="w-full h-full object-cover opacity-20 mix-blend-overlay" alt="Studio Background" />
                                </div>
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700 z-10"><RadioIcon size={250} /></div>
                                <div className="relative z-20">
                                    <h2 className="text-xl font-black uppercase mb-4 opacity-70 italic tracking-widest leading-none">ON AIR NOW</h2>
                                    <p className="text-5xl md:text-9xl font-black italic uppercase leading-[0.8] tracking-tighter mb-8">{liveInfo.show}</p>
                                    <p className="font-black uppercase tracking-[0.2em] text-lg md:text-2xl border-l-8 border-black pl-6 mb-12 italic">{liveInfo.host}</p>
                                    <button onClick={() => setIsRadioVisible(true)} className="bg-black text-white px-16 py-6 rounded-2xl font-black uppercase italic text-sm hover:scale-105 transition-all shadow-2xl active:scale-95">START LISTENING</button>
                                </div>
                            </div>
                            <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-[50px] backdrop-blur-md flex flex-col shadow-2xl">
                                <h2 className="text-2xl font-black uppercase mb-8 border-b border-orange-500/50 pb-6 italic text-orange-500 tracking-tighter uppercase">Program Guide</h2>
                                <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
                                    {fullSchedule.map((schedule, idx) => (
                                        <button key={idx} onClick={() => setActiveScheduleTab(idx)} className={`px-4 py-2 rounded-full text-xs font-black uppercase italic whitespace-nowrap transition-all ${activeScheduleTab === idx ? 'bg-orange-500 text-black shadow-lg scale-105' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>{schedule.day}</button>
                                    ))}
                                </div>
                                <div className="space-y-4 font-bold uppercase text-xs italic overflow-y-auto max-h-[400px]">
                                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                        {fullSchedule[activeScheduleTab].shows.map((show, j) => (
                                            <div key={j} className="border-l-2 border-orange-500/50 pl-4 py-2 mb-3 bg-white/5 rounded-r-lg hover:bg-white/10 transition-colors">
                                                <span className="text-orange-500 font-black tracking-widest text-[10px]">{show.time}</span><br />
                                                <span className="text-white text-sm leading-tight block mt-1">{show.name}</span>
                                                {show.host && <span className="text-gray-400 text-[10px] block mt-1 tracking-wide">{show.host}</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-24">
                            <h2 className="text-3xl md:text-5xl font-black mb-12 text-white uppercase italic tracking-tighter border-l-8 border-orange-500 pl-8">Partners & <span className="text-orange-500">Promotions</span></h2>
                            <div className="flex overflow-x-auto gap-8 pb-10 no-scrollbar items-center">
                                {mediaData.partners.map(p => (
                                    <div key={p.id} className="flex-none w-[240px] aspect-video bg-white rounded-[32px] flex items-center justify-center p-8 shadow-2xl hover:scale-105 transition-transform cursor-pointer"><img src={p.logo} alt={p.name} className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-500" /></div>
                                ))}
                                <div onClick={() => navigateTo('advertise')} className="flex-none w-[240px] aspect-video bg-zinc-900 border-4 border-dashed border-orange-500/30 rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:bg-orange-500/10 hover:border-orange-500 transition-all group">
                                    <DollarSign className="text-orange-500 mb-3 group-hover:scale-110 transition-transform" size={40} /><span className="font-black uppercase text-[11px] text-orange-500 tracking-[0.2em] italic">BOOK AD SPOT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {currentPage === 'team' && (
                    <div className="pt-32 px-4 md:px-12 pb-32 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <button onClick={() => navigateTo('home')} className="mb-12 text-orange-500 font-black uppercase text-xs flex items-center gap-2 hover:text-white transition-colors"><ArrowLeft size={16} /> BACK TO HOME</button>
                        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
                            <div className="w-full md:w-[450px] aspect-[3/4] rounded-[50px] overflow-hidden shadow-2xl border border-white/10 bg-zinc-900"><img src={selectedMember?.image} className="w-full h-full object-cover" alt={selectedMember?.name} onError={(e) => {e.currentTarget.src = `https://placehold.co/400x600/black/orange?text=${selectedMember?.name.split(' ')[0]}`; }} /></div>
                            <div className="flex-1 space-y-8">
                                <h1 className="text-7xl md:text-9xl font-black italic uppercase leading-[0.8] tracking-tighter text-white">{selectedMember?.name}</h1>
                                <p className="text-2xl font-black text-orange-500 uppercase italic border-l-8 border-orange-500 pl-6">{selectedMember?.role}</p>
                                <p className="text-xl md:text-3xl text-gray-300 leading-relaxed font-bold italic">{selectedMember?.bio}</p>
                                <div className="flex gap-4 pt-4">
                                    <button className="bg-zinc-900 hover:bg-orange-500 hover:text-black p-5 rounded-2xl transition-all border border-white/5"><Instagram size={24} /></button>
                                    <button className="bg-zinc-900 hover:bg-orange-500 hover:text-black p-5 rounded-2xl transition-all border border-white/5"><Facebook size={24} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            {isRadioVisible && <AudioPlayerBar onClose={() => setIsRadioVisible(false)} liveInfo={liveInfo} />}
            <PlayerModal isOpen={isPlayerOpen} onClose={() => setIsPlayerOpen(false)} media={activeMedia} />
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        </div>
    );
};

export default App;



