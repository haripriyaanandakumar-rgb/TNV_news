import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminPage, LoginCard, WritePage } from '@/components';
import { Shell } from '@/layout';
import { ArticlePage, DistrictsPage, HomePage, ListingPage } from '@/pages';
import { articles } from '@/data';

function AppContent() {
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [savedIds, setSavedIds] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem('tnv-saved') ?? '[]') as string[]; } catch { return []; } });
  useEffect(() => localStorage.setItem('tnv-saved', JSON.stringify(savedIds)), [savedIds]);
  const saveArticle = (id: string) => setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const likeArticle = () => undefined;
  const savedArticles = useMemo(() => articles.filter((article) => savedIds.includes(article.id)), [savedIds]);
  return <Shell selectedDistrict={selectedDistrict} onDistrict={setSelectedDistrict}><Routes><Route path="/" element={<HomePage selectedDistrict={selectedDistrict} savedIds={savedIds} onSave={saveArticle} onLike={likeArticle} />} /><Route path="/articles" element={<ListingPage title="Latest Articles" articlesToShow={articles} savedIds={savedIds} onSave={saveArticle} onLike={likeArticle} />} /><Route path="/popular" element={<ListingPage title="Popular News" articlesToShow={[...articles].sort((a, b) => b.likes - a.likes)} savedIds={savedIds} onSave={saveArticle} onLike={likeArticle} />} /><Route path="/saved" element={<ListingPage title="Saved Stories" articlesToShow={savedArticles} savedIds={savedIds} onSave={saveArticle} onLike={likeArticle} />} /><Route path="/districts" element={<DistrictsPage selectedDistrict={selectedDistrict} onDistrict={setSelectedDistrict} savedIds={savedIds} onSave={saveArticle} onLike={likeArticle} />} /><Route path="/article/:id" element={<ArticlePage savedIds={savedIds} onSave={saveArticle} />} /><Route path="/write" element={<WritePage />} /><Route path="/admin" element={<AdminPage />} /><Route path="/login" element={<LoginCard />} /><Route path="/signup" element={<LoginCard signup />} /><Route path="/my-articles" element={<ListingPage title="My Articles" articlesToShow={[]} savedIds={savedIds} onSave={saveArticle} onLike={likeArticle} />} /></Routes></Shell>;
}

export default function App() { return <BrowserRouter><AppContent /></BrowserRouter>; }
