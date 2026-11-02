import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ArrowRight, Bookmark, ChevronDown, ChevronRight, Eye, Flame, Home, Mail, MapPin, PenLine, Sparkles } from 'lucide-react';
import { articles, districts, popularNews } from '@/data';

type ShellProps = { children: React.ReactNode; selectedDistrict: string; onDistrict: (district: string) => void };

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/popular', label: 'Popular', icon: Flame },
  { to: '/saved', label: 'Saved', icon: Bookmark },
  { to: '/write', label: 'Write Article', icon: PenLine },
];

export function Logo() {
  return <Link to="/" className="brand"><span className="brand-mark">TNV</span><span className="brand-text"><strong>TNV News</strong><small>Tamil Nadu’s News Platform</small></span></Link>;
}

export function Header() {
  return <header className="topbar"><div className="topbar-inner"><Logo /><nav className="main-nav">{navLinks.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'}><Icon size={14} />{label}</NavLink>)}</nav><div className="top-actions"><Link className="login-btn" to="/login">Login</Link><Link className="signup-btn" to="/signup">Sign Up</Link></div></div></header>;
}

export function DistrictSidebar({ selectedDistrict, onDistrict }: { selectedDistrict: string; onDistrict: (district: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const choose = (district: string) => { onDistrict(district); navigate('/'); };
  return <aside className="district-sidebar"><button className="district-toggle" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}><span><MapPin size={15} />Tamil Nadu Districts</span><ChevronDown size={16} className={expanded ? 'is-open' : ''} /></button><div className={`district-body ${expanded ? 'is-open' : ''}`}><ul className="district-list">{['All Districts', ...districts].map((district) => <li key={district}><button className={selectedDistrict === district ? 'is-active' : ''} onClick={() => choose(district)}>{district}</button></li>)}</ul><Link to="/districts" className="view-all-districts">View All Districts <ArrowRight size={15} /></Link></div></aside>;
}

export function PopularPanel() {
  return <section className="panel"><div className="panel-heading"><h2><Flame size={18} /> Popular News</h2><Link to="/popular" className="panel-link">View All <ChevronRight size={14} /></Link></div><div className="popular-list">{popularNews.map((item) => <Link to={`/article/${articles.find((article) => article.title.includes(item.title.split(' ').slice(0, 3).join(' ')))?.id ?? articles[0].id}`} className="popular-item" key={item.rank}><span className="rank">{item.rank}</span><img src={item.image} alt="" /><div><strong>{item.title}</strong><small><MapPin size={12} /> {item.district}<span><Eye size={12} /> {item.views}</span></small></div></Link>)}</div></section>;
}

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (/^\S+@\S+\.\S+$/.test(email)) setSuccess(true); };
  return <section className="panel newsletter"><div className="mail-icon"><Mail size={20} /></div><h2>Subscribe to our Newsletter</h2><p>Get the latest news and updates directly in your inbox.</p>{success ? <div className="success-message"><Sparkles size={16} /> You’re on the list. Welcome aboard.</div> : <form onSubmit={submit}><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email address" aria-label="Email address" /><button className="primary-btn" type="submit">Subscribe</button></form>}</section>;
}

export function Shell({ children, selectedDistrict, onDistrict }: ShellProps) {
  return <><Header /><div className="app-layout"><DistrictSidebar selectedDistrict={selectedDistrict} onDistrict={onDistrict} /><main className="main-content">{children}</main><aside className="right-rail"><PopularPanel /><Newsletter /></aside></div></>;
}
