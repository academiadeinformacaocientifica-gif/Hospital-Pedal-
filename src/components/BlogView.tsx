import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Tag, 
  Share2, 
  BookOpen, 
  Check, 
  ArrowLeft,
  Filter,
  Sparkles,
  ChevronRight,
  Stethoscope,
  PhoneCall
} from 'lucide-react';
import { BlogPost, TabType } from '../types';
import { BLOG_POSTS } from '../data/blogData';

interface BlogViewProps {
  onNavigateToTab?: (tab: TabType) => void;
  onSelectDoctorToBook?: (doctorName: string) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onNavigateToTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    { id: 'all', label: 'Todos os Artigos' },
    { id: 'Cirurgia Robótica', label: 'Cirurgia Robótica' },
    { id: 'Nefrologia', label: 'Nefrologia' },
    { id: 'Cardiologia', label: 'Cardiologia' },
    { id: 'Neurociência', label: 'Neurociência' },
    { id: 'Saúde & Prevenção', label: 'Saúde & Prevenção' },
    { id: 'Institucional', label: 'Institucional' },
  ];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
  }, []);

  const handleCopyShare = (post: BlogPost) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#blog-${post.slug}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // If viewing single post detail
  if (selectedPost) {
    const relatedPosts = BLOG_POSTS.filter(
      p => p.id !== selectedPost.id && (p.category === selectedPost.category || p.tags.some(t => selectedPost.tags.includes(t)))
    ).slice(0, 3);

    return (
      <div className="w-full max-w-[1050px] mx-auto px-4 sm:px-6 py-8 md:py-12">
        <button
          onClick={() => {
            setSelectedPost(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#45645a] hover:text-[#172621] mb-8 group transition-colors cursor-pointer"
          id="btn-back-to-blog"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Voltar a todos os artigos</span>
        </button>

        <article className="bg-white rounded-3xl border border-[#dde7e3] overflow-hidden shadow-sm">
          {/* Header Image */}
          <div className="relative w-full h-[280px] sm:h-[380px] md:h-[460px] bg-[#172621]">
            <img 
              src={selectedPost.imageUrl} 
              alt={selectedPost.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6 text-white max-w-3xl">
              <span className="inline-block px-3 py-1 bg-[#801b33] text-white text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
                {selectedPost.category}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-white">
                {selectedPost.title}
              </h1>
            </div>
          </div>

          {/* Metadata Bar */}
          <div className="px-6 sm:px-10 py-5 border-b border-[#dde7e3] bg-[#f8faf9] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={selectedPost.author.avatar} 
                alt={selectedPost.author.name}
                className="w-12 h-12 rounded-full object-cover border border-[#45645a]/30 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-sm font-bold text-[#172621]">{selectedPost.author.name}</p>
                <p className="text-xs text-[#52605b]">{selectedPost.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-[#52605b]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#45645a]" />
                <span>{selectedPost.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#45645a]" />
                <span>{selectedPost.readTime}</span>
              </div>
              <button
                onClick={() => handleCopyShare(selectedPost)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#dde7e3] hover:bg-[#eaf2ef] text-[#172621] transition-colors cursor-pointer"
                title="Partilhar artigo"
                id="btn-share-article"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#45645a]" />}
                <span className="text-xs font-semibold">{copiedLink ? 'Ligação Copiada!' : 'Partilhar'}</span>
              </button>
            </div>
          </div>

          {/* Article Body */}
          <div className="px-6 sm:px-10 md:px-14 py-8 md:py-12">
            <p className="text-lg sm:text-xl text-[#2d3a35] font-light leading-relaxed mb-8 italic border-l-4 border-[#801b33] pl-5 bg-[#fafcfb] py-2 rounded-r-xl">
              {selectedPost.excerpt}
            </p>

            <div className="space-y-6 text-[#33423d] text-base sm:text-[17px] leading-relaxed">
              {selectedPost.content.split('\n\n').map((block, idx) => {
                if (block.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-xl sm:text-2xl font-bold text-[#172621] pt-4 mb-2">
                      {block.replace('### ', '')}
                    </h3>
                  );
                }
                if (block.startsWith('1. ') || block.startsWith('- ')) {
                  const items = block.split('\n');
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-2.5 text-[#33423d] my-4 pl-2 bg-[#f9fbfa] p-5 rounded-2xl border border-[#e5eeea]">
                      {items.map((it, itemIdx) => (
                        <li key={itemIdx} className="leading-relaxed">
                          {it.replace(/^[0-9]+\.\s+|^-\s+/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed">
                    {block}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-[#dde7e3] flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[#52605b] uppercase tracking-wider flex items-center gap-1 mr-2">
                <Tag className="w-3.5 h-3.5" /> Tags:
              </span>
              {selectedPost.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 rounded-lg bg-[#f0f4f2] text-[#45645a] text-xs font-medium hover:bg-[#e2ece8] transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* CTA Box */}
            <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#172621] via-[#223932] to-[#172621] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Stethoscope className="w-5 h-5 text-[#801b33]" />
                  <span className="text-xs font-mono text-[#c8dcd4] uppercase tracking-wider">Cuidados Especializados</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-1">Deseja marcar uma consulta com a nossa equipa médica?</h4>
                <p className="text-xs sm:text-sm text-[#c8dcd4] max-w-lg leading-relaxed font-light">
                  O Complexo Hospitalar do Pedalé disponibiliza atendimento presencial no Morro Bento e telemedicina em todo o país.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    if (onNavigateToTab) onNavigateToTab('doctors');
                  }}
                  className="px-6 py-3 bg-[#801b33] hover:bg-[#681428] text-white font-semibold text-sm rounded-xl transition-all shadow whitespace-nowrap active:scale-95 text-center cursor-pointer"
                  id="btn-cta-corpo-clinico"
                >
                  Ver Corpo Clínico
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-14">
            <h3 className="text-xl font-bold text-[#172621] mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#801b33]" />
              Artigos Relacionados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relPost) => (
                <div
                  key={relPost.id}
                  onClick={() => {
                    setSelectedPost(relPost);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-2xl border border-[#dde7e3] overflow-hidden p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-36 rounded-xl overflow-hidden mb-3 bg-[#172621]">
                      <img 
                        src={relPost.imageUrl} 
                        alt={relPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-[#801b33] uppercase">{relPost.category}</span>
                    <h4 className="text-sm font-bold text-[#172621] group-hover:text-[#801b33] transition-colors line-clamp-2 mt-1 mb-2">
                      {relPost.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#52605b] pt-3 border-t border-[#f0f4f2]">
                    <span>{relPost.date}</span>
                    <span className="text-[#801b33] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Ler <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-12 pb-16 px-4 sm:px-6 md:px-8 max-w-[1320px] mx-auto">
      
      {/* Header Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-[#172621] p-8 sm:p-12 md:p-14 text-white shadow-sm mt-2">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#c8dcd4] text-xs font-mono tracking-widest uppercase mb-4 border border-white/15">
            <BookOpen className="w-3.5 h-3.5 text-[#801b33]" />
            <span>Blog & Atualizações Clínicas</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Notícias, Inovação e Saúde no Pedalé
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed font-light">
            Acompanhe artigos científicos, avanços em cirurgia robótica, orientações de prevenção e comunicados oficiais do Complexo Hospitalar do Pedalé.
          </p>
        </div>

        {/* Search Bar in Hero */}
        <div className="relative z-10 mt-8 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#52605b]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar artigos por tema, especialidade ou médico..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-[#172621] placeholder-[#7d8f88] text-sm focus:outline-none focus:ring-2 focus:ring-[#801b33] shadow-lg"
              id="input-blog-search"
            />
          </div>
        </div>
      </section>

      {/* Featured Highlight Article (if no search active) */}
      {!searchQuery && selectedCategory === 'all' && featuredPost && (
        <section className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#801b33]" />
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#52605b]">Artigo em Destaque</h2>
          </div>

          <div 
            onClick={() => {
              setSelectedPost(featuredPost);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group cursor-pointer rounded-3xl border border-[#dde7e3] bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
            id="featured-article-card"
          >
            <div className="lg:col-span-7 relative h-[260px] sm:h-[320px] lg:h-full min-h-[300px] overflow-hidden bg-[#172621]">
              <img 
                src={featuredPost.imageUrl} 
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 bg-[#801b33] text-white text-xs font-semibold rounded-full uppercase tracking-wider shadow">
                  {featuredPost.category}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-[#52605b] mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#45645a]" /> {featuredPost.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#45645a]" /> {featuredPost.readTime}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#172621] leading-tight mb-3 group-hover:text-[#801b33] transition-colors">
                  {featuredPost.title}
                </h3>

                <p className="text-sm text-[#52605b] line-clamp-3 leading-relaxed mb-6 font-light">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#dde7e3] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img 
                    src={featuredPost.author.avatar} 
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#dde7e3]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#172621]">{featuredPost.author.name}</p>
                    <p className="text-[11px] text-[#7d8f88]">{featuredPost.author.role}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#801b33] group-hover:translate-x-1 transition-transform">
                  Ler Artigo <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Pills & Filters */}
      <section className="w-full flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">
            <Filter className="w-4 h-4 text-[#45645a] flex-shrink-0 mr-1" />
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    active 
                      ? 'bg-[#45645a] text-white shadow-sm' 
                      : 'bg-white text-[#52605b] hover:bg-[#eef4f1] border border-[#dde7e3]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <span className="text-xs text-[#7d8f88] font-mono">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo disponível' : 'artigos disponíveis'}
          </span>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#dde7e3]">
            <Search className="w-10 h-10 text-[#7d8f88] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-semibold text-[#172621] mb-1">Nenhum artigo encontrado</h3>
            <p className="text-xs sm:text-sm text-[#52605b] max-w-md mx-auto mb-4">
              Não encontramos resultados para "{searchQuery}". Tente outros termos ou limpe o filtro de categorias.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 bg-[#45645a] text-white text-xs font-medium rounded-xl hover:bg-[#344d45] transition-colors cursor-pointer"
            >
              Ver Todos os Artigos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    setSelectedPost(post);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl border border-[#dde7e3] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Card Image */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#172621]">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 bg-[#172621]/80 backdrop-blur-md text-white text-[11px] font-medium rounded-full uppercase tracking-wider border border-white/20">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-3 text-xs text-[#7d8f88] mb-2.5">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#45645a]" /> {post.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#45645a]" /> {post.readTime}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#172621] leading-snug mb-2 group-hover:text-[#801b33] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#52605b] line-clamp-3 leading-relaxed font-light">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Author Footer */}
                  <div className="px-5 sm:px-6 py-4 border-t border-[#f0f4f2] bg-[#fafcfb] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#dde7e3]"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-xs font-medium text-[#172621] line-clamp-1">{post.author.name}</span>
                    </div>

                    <span className="text-xs font-semibold text-[#801b33] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Ler <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Hospital Help & Urgencies Info Banner */}
      <section className="bg-[#eaf2ef] border border-[#d2e2dc] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#45645a] text-white flex items-center justify-center shrink-0 shadow-sm">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-[#172621]">Linha de Apoio e Emergência 24/7</h4>
            <p className="text-xs sm:text-sm text-[#52605b]">Dúvidas sobre consultas, exames ou encaminhamento para o Serviço de Urgência do Pedalé.</p>
          </div>
        </div>
        <a 
          href="tel:+244933939393" 
          className="px-6 py-3 bg-[#45645a] hover:bg-[#344d45] text-white text-sm font-semibold rounded-2xl transition-all shadow-sm whitespace-nowrap"
        >
          Ligar +244 933 939 393
        </a>
      </section>

    </div>
  );
};
