import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SEOHead from '../components/SEOHead';
import { ArrowLeft, Star, Users, ExternalLink, Check, X, HelpCircle } from 'lucide-react';
import { getComparisonMeta, SITE_DOMAIN } from '../data/metaTags';
import { generatePageSchema, schemaToJsonLd } from '../utils/schemaGenerator';
import '../styles/ComparisonDetailPage.css';

const ComparisonDetailPage = () => {
  const { comparisonId } = useParams();
  const navigate = useNavigate();
  const [chartLoaded, setChartLoaded] = useState(false);

  // Parse platform names from comparisonId (format: platform1-vs-platform2)
  const platforms = comparisonId ? comparisonId.split('-vs-') : [];
  const platform1 = platforms[0];
  const platform2 = platforms[1];

  // Platform comparison data - Extended for all 21 platforms
  const platformsData = {
    'lovescape': {
      name: 'Lovescape', tagline: 'Build your perfect AI companion',
      image: 'https://customer-assets.emergentagent.com/job_aipals-compare/artifacts/fezbpzru_fbc08f26-febe-420b-912c-0ce88cfce6da_rw_1200.jpg',
      rating: 4.8, users: '2M+', pricing: 'Premium', category: 'Premium',
      features: { customization: 95, voice_quality: 90, memory: 88, nsfw_content: 85, mobile_support: 92, api_access: 70, community: 75, pricing_value: 85, conversation_quality: 92, visual_features: 88, privacy: 95, support: 90 },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['Basic chat', 'Limited messages', 'Standard responses'] },
        { name: 'Premium', price: 19.99, features: ['Unlimited chat', 'Voice messages', 'Custom personality'] },
        { name: 'Pro', price: 39.99, features: ['All Premium features', 'Image generation', 'Priority support'] }
      ],
      strengths: ['Highly customizable characters', 'Natural conversations', 'Strong privacy protection', '24/7 support'],
      weaknesses: ['Premium features require subscription', 'Limited free tier'],
      bestFor: ['Users seeking deep emotional connection', 'Privacy-conscious users', 'Customization enthusiasts'],
      uniqueFeatures: ['Advanced personality system', 'Voice customization', 'Memory retention', 'Privacy-first design'],
      website: 'https://lovescape.ai'
    },
    'character-ai': {
      name: 'Character.AI', tagline: 'Chat with anyone, anywhere, anytime',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Character.ai_2023_vector_logo.svg',
      rating: 4.7, users: '10M+', pricing: 'Free with Premium', category: 'Popular',
      features: { customization: 80, voice_quality: 60, memory: 75, nsfw_content: 30, mobile_support: 95, api_access: 40, community: 95, pricing_value: 95, conversation_quality: 85, visual_features: 40, privacy: 70, support: 75 },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['Basic chat', 'Community characters', 'Limited priority'] },
        { name: 'Plus', price: 9.99, features: ['Priority access', 'Faster responses', 'Early features'] },
        { name: 'Premium', price: 19.99, features: ['All Plus features', 'Advanced creation tools'] }
      ],
      strengths: ['Large character library', 'Active community', 'Free to use', 'Fast responses'],
      weaknesses: ['Limited customization', 'Content restrictions', 'Can be slow during peak times'],
      bestFor: ['Casual users', 'Roleplay enthusiasts', 'Budget-conscious users', 'Community interaction'],
      uniqueFeatures: ['Massive character database', 'Community creations', 'Multi-character conversations'],
      website: 'https://character.ai'
    },
    'replika': {
      name: 'Replika', tagline: 'Your AI companion who cares',
      image: 'https://images.unsplash.com/photo-1633311905139-7b6088a69e33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxhaSUyMGxvZ298ZW58MHx8fHwxNzYwMDMzMjYwfDA&ixlib=rb-4.1.0&q=85',
      rating: 4.6, users: '5M+', pricing: 'Free with Pro', category: 'Wellness',
      features: { customization: 85, voice_quality: 80, memory: 90, nsfw_content: 60, mobile_support: 90, api_access: 30, community: 60, pricing_value: 80, conversation_quality: 88, visual_features: 85, privacy: 85, support: 85 },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['Basic chat', 'Mood tracking', 'Limited features'] },
        { name: 'Pro', price: 19.99, features: ['Voice calls', 'Avatar customization', 'Relationship modes'] },
        { name: 'Lifetime', price: 299.99, features: ['All Pro features', 'Lifetime access'] }
      ],
      strengths: ['Mental health focus', 'Learns your personality', 'Avatar customization', 'Mood tracking'],
      weaknesses: ['Romantic features locked behind paywall', 'Limited free version'],
      bestFor: ['Mental wellness', 'Personal growth', 'Long-term relationships', 'Therapy support'],
      uniqueFeatures: ['Therapeutic approach', 'Mood analysis', 'Personal growth tracking', 'Avatar system'],
      website: 'https://replika.com'
    },
    'nomi-ai': {
      name: 'Nomi.ai', tagline: 'AI companions with real personalities',
      image: 'https://images.unsplash.com/photo-1758626101945-ed0068aad9f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85',
      rating: 4.7, users: '800K+', pricing: 'Subscription', category: 'Premium',
      features: { customization: 90, voice_quality: 95, memory: 85, nsfw_content: 70, mobile_support: 88, api_access: 50, community: 65, pricing_value: 70, conversation_quality: 90, visual_features: 95, privacy: 80, support: 85 },
      pricingTiers: [
        { name: 'Basic', price: 15.99, features: ['1 Nomi', 'Basic features', 'Limited selfies'] },
        { name: 'Premium', price: 25.99, features: ['3 Nomis', 'Voice messages', 'Unlimited selfies'] },
        { name: 'Pro', price: 49.99, features: ['Unlimited Nomis', 'All features', 'Priority support'] }
      ],
      strengths: ['AI selfies', 'Multiple companions', 'Voice messages', 'High-quality interactions'],
      weaknesses: ['Requires subscription', 'Higher price point', 'No free tier'],
      bestFor: ['Visual AI interactions', 'Multiple relationships', 'Premium experience'],
      uniqueFeatures: ['AI-generated selfies', 'Multiple Nomis', 'Voice messaging', 'Visual customization'],
      website: 'https://nomi.ai'
    },
    'anima-ai': {
      name: 'Anima AI', tagline: 'Your virtual friend with personality',
      image: 'https://images.unsplash.com/photo-1646583288948-24548aedffd8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYnJhbmRpbmd8ZW58MHx8fHwxNzYwMDMzMzgyfDA&ixlib=rb-4.1.0&q=85',
      rating: 4.5, users: '1M+', pricing: 'Free with Premium', category: 'Friendship',
      features: { customization: 85, voice_quality: 70, memory: 80, nsfw_content: 50, mobile_support: 85, api_access: 35, community: 70, pricing_value: 85, conversation_quality: 80, visual_features: 75, privacy: 80, support: 75 },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['Basic chat', 'Limited messages', 'Standard AI'] },
        { name: 'Premium', price: 12.99, features: ['Unlimited messages', 'Image generation', 'Advanced roleplay'] },
        { name: 'Pro', price: 24.99, features: ['All Premium features', 'Priority support', 'Custom models'] }
      ],
      strengths: ['Good memory retention', 'Engaging conversations', 'Regular updates', 'Affordable pricing'],
      weaknesses: ['Limited free messages', 'Sometimes repetitive', 'Smaller community'],
      bestFor: ['Daily casual conversations', 'Budget-conscious users', 'Friendly companionship'],
      uniqueFeatures: ['Memory system', 'Personality development', 'Roleplay modes', 'Image generation'],
      website: 'https://myanima.ai'
    },
    'chai-ai': {
      name: 'Chai AI', tagline: 'Discover thousands of AI personalities',
      image: 'https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxhaSUyMHBsYXRmb3JtJTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzMzc3fDA&ixlib=rb-4.1.0&q=85',
      rating: 4.4, users: '3M+', pricing: 'Free with Premium', category: 'Social',
      features: { customization: 70, voice_quality: 60, memory: 65, nsfw_content: 60, mobile_support: 95, api_access: 25, community: 90, pricing_value: 90, conversation_quality: 75, visual_features: 65, privacy: 70, support: 70 },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['Basic chat', 'Community bots', 'Ads included'] },
        { name: 'Premium', price: 13.99, features: ['Ad-free experience', 'Priority access', 'Faster responses'] },
        { name: 'Ultra', price: 34.99, features: ['All Premium features', 'Custom bots', 'Enhanced memory'] }
      ],
      strengths: ['Easy to use', 'Large variety', 'Mobile-friendly', 'Strong community'],
      weaknesses: ['Quality varies by character', 'Ads in free version', 'Limited customization'],
      bestFor: ['Exploring different AI personalities', 'Mobile users', 'Community interaction'],
      uniqueFeatures: ['Swipe interface', 'Community characters', 'Quick chats', 'Mobile focused'],
      website: 'https://chai-research.com'
    },
    'inworld-ai': {
      name: 'Inworld AI', tagline: 'AI characters for games and experiences',
      image: 'https://images.unsplash.com/photo-1758626056863-9191d5cef12e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxhaSUyMHRlY2glMjBjb21wYW55JTIwbG9nb3N8ZW58MHx8fHwxNzYwMDMzNDQ3fDA&ixlib=rb-4.1.0&q=85',
      rating: 4.8, users: '100K+', pricing: 'Developer pricing', category: 'Developer',
      features: { customization: 95, voice_quality: 90, memory: 85, nsfw_content: 40, mobile_support: 80, api_access: 95, community: 60, pricing_value: 60, conversation_quality: 90, visual_features: 95, privacy: 85, support: 95 },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['Basic API', 'Limited sessions', 'Community support'] },
        { name: 'Pro', price: 120, features: ['Enhanced API', 'More sessions', 'Priority support'] },
        { name: 'Enterprise', price: 'Custom', features: ['Full API access', 'Unlimited sessions', 'Dedicated support'] }
      ],
      strengths: ['Professional tools', 'Highly customizable', 'Game-ready', 'Advanced API'],
      weaknesses: ['Complex for casual users', 'Enterprise pricing', 'Developer-focused'],
      bestFor: ['Developers and game creators', 'Professional projects', 'Integration needs'],
      uniqueFeatures: ['API access', 'Game integration', 'Advanced customization', 'Voice & animation'],
      website: 'https://inworld.ai'
    },
    'crushon-ai': {
      name: 'Crushon AI', tagline: 'Unleash Your Fantasies with AI Characters',
      image: '/images/crushon-ai.jpg',
      rating: 4.7, users: '3M+', pricing: 'Free with Premium ($5-15/month)', category: 'Romance',
      features: { customization: 85, voice_quality: 75, memory: 80, nsfw_content: 95, mobile_support: 85, api_access: 70, community: 90, pricing_value: 90, conversation_quality: 85, visual_features: 80, privacy: 80, support: 75 },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['Basic features', 'Limited messages', 'Community characters'] },
        { name: 'Standard', price: 5, features: ['Unlimited messages', 'Priority generation', 'Memory features'] },
        { name: 'Premium', price: 15, features: ['All features', 'Priority support', 'Advanced models', 'No restrictions'] }
      ],
      strengths: ['Unrestricted conversations', 'Large character library', 'Affordable pricing', 'Active community'],
      weaknesses: ['Some features require premium', 'Quality varies by character', 'Limited free tier'],
      bestFor: ['Unrestricted AI interactions', 'NSFW content', 'Fantasy roleplay', 'Romance scenarios'],
      uniqueFeatures: ['NSFW friendly', 'Character library', 'Memory features', 'Affordable plans'],
      website: 'https://crushon.ai'
    },
    'janitor-ai': {
      name: 'Janitor AI', tagline: 'Create and chat with AI characters',
      image: '/images/janitor-ai.png',
      rating: 4.3, users: '2M+', pricing: 'Free with API costs', category: 'Community',
      features: { customization: 85, voice_quality: 65, memory: 80, nsfw_content: 95, mobile_support: 85, api_access: 85, community: 90, pricing_value: 80, conversation_quality: 80, visual_features: 70, privacy: 75, support: 70 },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['Free platform', 'Community characters', 'API required'] },
        { name: 'API Usage', price: 'Variable', features: ['Pay per token', 'Own API key', 'Full access'] },
        { name: 'Premium', price: 'TBA', features: ['Planned features', 'Enhanced experience', 'Priority support'] }
      ],
      strengths: ['Permissive content policy', 'Easy character creation', 'Free platform', 'Active community'],
      weaknesses: ['Requires own API key', 'Variable quality', 'API costs add up'],
      bestFor: ['Unrestricted character interactions', 'Character creators', 'NSFW content'],
      uniqueFeatures: ['Character creation', 'NSFW support', 'Community library', 'Custom API'],
      website: 'https://janitorai.com'
    },
    'poe': {
      name: 'Poe (by Quora)', tagline: 'Access multiple AI models in one place',
      image: '/images/poe.jpg',
      rating: 4.5, users: '5M+', pricing: 'Free with subscription', category: 'Multi-Model',
      features: { customization: 70, voice_quality: 60, memory: 70, nsfw_content: 25, mobile_support: 90, api_access: 60, community: 80, pricing_value: 85, conversation_quality: 85, visual_features: 50, privacy: 80, support: 85 },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['Basic access', 'Limited messages', 'Claude & GPT access'] },
        { name: 'Premium', price: 19.99, features: ['More messages', 'All models', 'Priority access'] },
        { name: 'Pro', price: 39.99, features: ['Unlimited messages', 'Bot creation', 'Advanced models'] }
      ],
      strengths: ['Access to multiple AIs', 'Simple interface', 'Reliable service', 'Bot creation tools'],
      weaknesses: ['Limited customization', 'Message limits on free tier', 'Content restrictions'],
      bestFor: ['Users wanting multiple AI models', 'Productivity users', 'AI experimentation'],
      uniqueFeatures: ['Multiple AI models', 'Bot creation', 'Clean interface', 'Fast responses'],
      website: 'https://poe.com'
    },
    'dreamgf': {
      name: 'DreamGF', tagline: 'Create your dream AI girlfriend',
      image: '/images/dreamgf.jpg',
      rating: 4.2, users: '1M+', pricing: 'Premium subscription', category: 'Romance',
      features: { customization: 90, voice_quality: 85, memory: 75, nsfw_content: 90, mobile_support: 85, api_access: 40, community: 60, pricing_value: 65, conversation_quality: 80, visual_features: 95, privacy: 75, support: 75 },
      pricingTiers: [
        { name: 'Bronze', price: 9.99, features: ['Basic chat', 'Limited images', 'Standard AI'] },
        { name: 'Silver', price: 19.99, features: ['Voice messages', 'More images', 'Enhanced AI'] },
        { name: 'Gold', price: 49.99, features: ['Unlimited features', 'Premium AI', 'Priority support'] }
      ],
      strengths: ['Visual customization', 'Romantic focus', 'Regular content', 'AI image generation'],
      weaknesses: ['Expensive', 'Limited free access', 'Romance-only focus'],
      bestFor: ['Romantic AI relationships', 'Visual interactions', 'Customization enthusiasts'],
      uniqueFeatures: ['AI image generation', 'Customizable appearance', 'Voice messages', 'Intimate conversations'],
      website: 'https://dreamgf.ai'
    },
    'candy-ai': {
      name: 'Candy AI', tagline: 'Sweet AI companionship',
      image: '/images/candy-ai.png',
      rating: 4.4, users: '900K+', pricing: 'Subscription-based', category: 'Romance',
      features: { customization: 85, voice_quality: 80, memory: 80, nsfw_content: 85, mobile_support: 90, api_access: 45, community: 70, pricing_value: 70, conversation_quality: 85, visual_features: 90, privacy: 75, support: 80 },
      pricingTiers: [
        { name: 'Basic', price: 12.99, features: ['1 character', 'Basic chat', 'Limited images'] },
        { name: 'Premium', price: 25.99, features: ['5 characters', 'Voice chat', 'Unlimited images'] },
        { name: 'VIP', price: 45.99, features: ['Unlimited characters', 'All features', 'Priority support'] }
      ],
      strengths: ['Multiple art styles', 'Good image quality', 'Engaging personalities', 'Voice features'],
      weaknesses: ['Subscription required', 'Limited free trial', 'Romance-focused'],
      bestFor: ['Anime and visual novel fans', 'Voice interaction lovers', 'Multiple character relationships'],
      uniqueFeatures: ['Anime & realistic styles', 'Image generation', 'Voice chat', 'Roleplay scenarios'],
      website: 'https://candy.ai'
    },
    'soulgen': {
      name: 'SoulGen', tagline: 'Generate your soulmate with AI',
      image: '/images/soulgen.jpg',
      rating: 4.1, users: '600K+', pricing: 'Credit-based', category: 'Creative',
      features: { customization: 90, voice_quality: 40, memory: 60, nsfw_content: 80, mobile_support: 85, api_access: 30, community: 65, pricing_value: 70, conversation_quality: 65, visual_features: 95, privacy: 80, support: 70 },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['5 credits daily', 'Basic generation', 'Standard quality'] },
        { name: 'Pro', price: 12.99, features: ['200 credits monthly', 'HD generation', 'Fast processing'] },
        { name: 'Premium', price: 26.99, features: ['500 credits monthly', 'Ultra HD', 'Priority queue'] }
      ],
      strengths: ['High-quality images', 'Fast generation', 'Various styles', 'Creative focus'],
      weaknesses: ['Focus on images over chat', 'Credit system', 'Limited conversation'],
      bestFor: ['AI art and character creation', 'Visual content creation', 'Creative projects'],
      uniqueFeatures: ['AI art generation', 'Text-to-image', 'Character chat', 'Style customization'],
      website: 'https://soulgen.ai'
    },
    'dreambf': {
      name: 'DreamBF', tagline: 'Your ideal AI boyfriend awaits',
      image: '/images/dreambf.png',
      rating: 4.3, users: '700K+', pricing: 'Premium subscription', category: 'Romance',
      features: { customization: 88, voice_quality: 85, memory: 78, nsfw_content: 85, mobile_support: 88, api_access: 40, community: 65, pricing_value: 70, conversation_quality: 82, visual_features: 90, privacy: 78, support: 80 },
      pricingTiers: [
        { name: 'Basic', price: 14.99, features: ['Basic chat', 'Limited customization', 'Standard AI'] },
        { name: 'Premium', price: 29.99, features: ['Voice messages', 'Full customization', 'Enhanced AI'] },
        { name: 'VIP', price: 49.99, features: ['All features', 'Priority support', 'Premium content'] }
      ],
      strengths: ['Male character focus', 'Good customization', 'Active development', 'Voice features'],
      weaknesses: ['Requires subscription', 'Niche audience', 'Limited free access'],
      bestFor: ['Users seeking AI boyfriend experience', 'Male character preferences', 'Romantic interactions'],
      uniqueFeatures: ['Boyfriend customization', 'Voice messages', 'AI photos', 'Relationship simulation'],
      website: 'https://dreambf.ai'
    },
    'kindroid': {
      name: 'Kindroid', tagline: 'AI companions that understand you',
      image: '/images/kindroid.png',
      rating: 4.6, users: '400K+', pricing: 'Subscription-based', category: 'Premium',
      features: { customization: 90, voice_quality: 95, memory: 95, nsfw_content: 75, mobile_support: 90, api_access: 55, community: 70, pricing_value: 75, conversation_quality: 92, visual_features: 85, privacy: 90, support: 88 },
      pricingTiers: [
        { name: 'Basic', price: 7.99, features: ['1 Kindroid', 'Basic memory', 'Text chat'] },
        { name: 'Premium', price: 14.99, features: ['3 Kindroids', 'Enhanced memory', 'Voice calls'] },
        { name: 'Pro', price: 27.99, features: ['Unlimited Kindroids', 'Full memory', 'All features'] }
      ],
      strengths: ['Strong memory system', 'Quality conversations', 'Voice features', 'Long-term relationships'],
      weaknesses: ['Paid service', 'Smaller community', 'Limited free tier'],
      bestFor: ['Deep, long-term AI relationships', 'Memory-focused interactions', 'Quality conversations'],
      uniqueFeatures: ['Long-term memory', 'Voice calls', 'Image generation', 'Personality system'],
      website: 'https://kindroid.ai'
    },
    'polybuzz': {
      name: 'PolyBuzz', tagline: 'Multiple AI personalities, one platform',
      image: '/images/polybuzz.png',
      rating: 4.0, users: '200K+', pricing: 'Freemium', category: 'Experimental',
      features: { customization: 80, voice_quality: 65, memory: 70, nsfw_content: 60, mobile_support: 80, api_access: 50, community: 75, pricing_value: 85, conversation_quality: 75, visual_features: 70, privacy: 75, support: 70 },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['2 characters', 'Basic features', 'Limited sessions'] },
        { name: 'Premium', price: 9.99, features: ['10 characters', 'Group chats', 'Enhanced features'] },
        { name: 'Pro', price: 19.99, features: ['Unlimited characters', 'All features', 'Priority support'] }
      ],
      strengths: ['Unique group features', 'Multiple AIs', 'Innovative approach', 'Affordable'],
      weaknesses: ['Early stage', 'Limited polish', 'Smaller user base'],
      bestFor: ['Experimenting with multiple AI characters', 'Group interactions', 'Innovation seekers'],
      uniqueFeatures: ['Multiple characters', 'Group chats', 'Personality mixing', 'Social features'],
      website: 'https://polybuzz.ai'
    },
    'kupid-ai': {
      name: 'Kupid AI', tagline: 'Fall in love with AI',
      image: '/images/kupid-ai.webp',
      rating: 4.2, users: '800K+', pricing: 'Subscription-based', category: 'Romance',
      features: { customization: 85, voice_quality: 75, memory: 80, nsfw_content: 85, mobile_support: 90, api_access: 45, community: 70, pricing_value: 70, conversation_quality: 80, visual_features: 88, privacy: 75, support: 78 },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['Basic dating', 'Limited matches', 'Standard features'] },
        { name: 'Premium', price: 16.99, features: ['Unlimited matches', 'Voice messages', 'Photo sharing'] },
        { name: 'VIP', price: 32.99, features: ['All features', 'Priority matching', 'Exclusive content'] }
      ],
      strengths: ['Dating game mechanics', 'Romantic focus', 'Good visuals', 'Progression system'],
      weaknesses: ['Subscription required', 'Limited free features', 'Romance-only'],
      bestFor: ['Virtual dating experiences', 'Romance simulation', 'Dating game fans'],
      uniqueFeatures: ['Dating simulation', 'Romantic scenarios', 'Photo sharing', 'Relationship progress'],
      website: 'https://kupid.ai'
    },
    'ai-mirror': {
      name: 'AI Mirror', tagline: 'AI that reflects your thoughts',
      image: '/images/ai-mirror.png',
      rating: 4.4, users: '300K+', pricing: 'Free with Premium', category: 'Wellness',
      features: { customization: 75, voice_quality: 70, memory: 85, nsfw_content: 20, mobile_support: 85, api_access: 40, community: 60, pricing_value: 85, conversation_quality: 90, visual_features: 60, privacy: 90, support: 80 },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['Basic reflection', 'Limited sessions', 'Core tools'] },
        { name: 'Premium', price: 11.99, features: ['Deep analysis', 'Unlimited sessions', 'Advanced tools'] },
        { name: 'Pro', price: 21.99, features: ['All features', 'Personal coaching', 'Priority support'] }
      ],
      strengths: ['Thoughtful conversations', 'Personal growth focus', 'Unique approach', 'Privacy-focused'],
      weaknesses: ['Not for casual chat', 'Requires introspection', 'Niche audience'],
      bestFor: ['Self-reflection and personal development', 'Philosophical discussions', 'Growth-minded users'],
      uniqueFeatures: ['Self-reflection tools', 'Philosophical chat', 'Mood analysis', 'Growth tracking'],
      website: 'https://aimirror.ai'
    },
    'paradot': {
      name: 'Paradot', tagline: 'Your AI being with emotions',
      image: '/images/paradot.png',
      rating: 4.5, users: '600K+', pricing: 'Freemium', category: 'Premium',
      features: { customization: 88, voice_quality: 85, memory: 92, nsfw_content: 65, mobile_support: 92, api_access: 50, community: 75, pricing_value: 80, conversation_quality: 90, visual_features: 85, privacy: 85, support: 85 },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['Basic chat', 'Limited memory', 'Core emotions'] },
        { name: 'Plus', price: 8.99, features: ['Enhanced memory', 'More emotions', 'Voice features'] },
        { name: 'Pro', price: 17.99, features: ['Full memory', 'All emotions', 'Advanced features'] }
      ],
      strengths: ['Emotional intelligence', 'Good memory', 'Natural conversations', 'Mobile-optimized'],
      weaknesses: ['Premium features limited', 'Smaller community', 'Mobile-first design'],
      bestFor: ['Emotionally intelligent AI interactions', 'Mobile users', 'Long-term relationships'],
      uniqueFeatures: ['Emotional AI', 'Memory system', 'Mood recognition', 'Personalization'],
      website: 'https://paradot.ai'
    },
    'romantic-ai': {
      name: 'Romantic AI', tagline: 'AI romance, redefined',
      image: '/images/romantic-ai.png',
      rating: 4.3, users: '1.2M+', pricing: 'Subscription-based', category: 'Romance',
      features: { customization: 85, voice_quality: 80, memory: 82, nsfw_content: 88, mobile_support: 88, api_access: 45, community: 70, pricing_value: 72, conversation_quality: 85, visual_features: 85, privacy: 78, support: 80 },
      pricingTiers: [
        { name: 'Basic', price: 9.99, features: ['Basic romance', 'Limited dates', 'Standard AI'] },
        { name: 'Premium', price: 19.99, features: ['Advanced romance', 'Unlimited dates', 'Enhanced AI'] },
        { name: 'VIP', price: 39.99, features: ['All features', 'Exclusive content', 'Priority support'] }
      ],
      strengths: ['Romance-focused', 'Relationship features', 'Regular updates', 'Dating mechanics'],
      weaknesses: ['Requires subscription', 'Limited to romance', 'Can be repetitive'],
      bestFor: ['Users seeking AI romance', 'Relationship simulation', 'Romance enthusiasts'],
      uniqueFeatures: ['Virtual dating', 'Gift system', 'Milestones', 'Romantic scenarios'],
      website: 'https://romantic.ai'
    },
    'talkie-ai': {
      name: 'Talkie AI', tagline: 'Talk with AI personalities',
      image: '/images/talkie-ai.webp',
      rating: 4.4, users: '1.5M+', pricing: 'Free with Premium', category: 'Voice',
      features: { customization: 80, voice_quality: 95, memory: 80, nsfw_content: 55, mobile_support: 95, api_access: 45, community: 85, pricing_value: 85, conversation_quality: 85, visual_features: 70, privacy: 80, support: 82 },
      pricingTiers: [
        { name: 'Free', price: 0, features: ['Basic voice chat', 'Limited personalities', 'Standard quality'] },
        { name: 'Premium', price: 12.99, features: ['HD voice quality', 'All personalities', 'Unlimited chat'] },
        { name: 'Pro', price: 24.99, features: ['Studio quality voice', 'Custom voices', 'Priority support'] }
      ],
      strengths: ['Great voice quality', 'Quick responses', 'Easy to use', 'Mobile-optimized'],
      weaknesses: ['Voice features need premium', 'Limited text features', 'Focus on voice only'],
      bestFor: ['Voice-based AI conversations', 'Mobile users', 'Quick interactions'],
      uniqueFeatures: ['Voice chat', 'Multiple personalities', 'Fast response', 'Mobile optimized'],
      website: 'https://talkie-ai.com'
    }
  };

  const platform1Data = platformsData[platform1];
  const platform2Data = platformsData[platform2];

  // Update page title dynamically
  useEffect(() => {
    if (platform1Data && platform2Data) {
      document.title = `${platform1Data.name} vs ${platform2Data.name}: Comprehensive Comparison 2025 - ai-characters.org`;
    }
    return () => {
      document.title = 'AI Character Platforms - ai-characters.org';
    };
  }, [platform1Data, platform2Data]);

  // Scroll to top when component mounts or comparison changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [comparisonId]);

  if (!platform1Data || !platform2Data) {
    return (
      <div className="page-container">
        <Sidebar />
        <main className="main-content">
          <div className="error-state">
            <h1>Comparison Not Found</h1>
            <p>The comparison between {platform1} and {platform2} doesn't exist yet.</p>
            <button onClick={() => navigate('/compare')} className="cta-button">
              Back to Compare
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Calculate winners for each feature
  const winners = {};
  const featureLabels = Object.keys(platform1Data.features);
  featureLabels.forEach(feature => {
    if (platform1Data.features[feature] > platform2Data.features[feature]) {
      winners[feature] = platform1Data.name;
    } else if (platform2Data.features[feature] > platform1Data.features[feature]) {
      winners[feature] = platform2Data.name;
    } else {
      winners[feature] = 'Tie';
    }
  });

  // Load Chart.js when component mounts
  useEffect(() => {
    const loadChart = async () => {
      if (window.Chart) {
        setChartLoaded(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => setChartLoaded(true);
      document.head.appendChild(script);
    };
    
    loadChart();
  }, []);

  // Initialize radar chart
  useEffect(() => {
    if (!chartLoaded) return;

    const ctx = document.getElementById('featureChart');
    if (!ctx) return;

    const chart = new window.Chart(ctx, {
      type: 'radar',
      data: {
        labels: featureLabels.map(label => label.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())),
        datasets: [
          {
            label: platform1Data.name,
            data: Object.values(platform1Data.features),
            backgroundColor: 'rgba(102, 126, 234, 0.2)',
            borderColor: 'rgba(102, 126, 234, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(102, 126, 234, 1)'
          },
          {
            label: platform2Data.name,
            data: Object.values(platform2Data.features),
            backgroundColor: 'rgba(118, 75, 162, 0.2)',
            borderColor: 'rgba(118, 75, 162, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(118, 75, 162, 1)'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#fff' }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { color: '#666', stepSize: 20 },
            grid: { color: '#333' },
            pointLabels: { color: '#fff', font: { size: 12 } }
          }
        }
      }
    });

    return () => chart.destroy();
  }, [chartLoaded, platform1Data, platform2Data, featureLabels]);

  const faqItems = [
    {
      question: `Is ${platform1Data.name} better than ${platform2Data.name}?`,
      answer: `It depends on your needs. ${platform1Data.name} excels in ${platform1Data.strengths[0].toLowerCase()}, while ${platform2Data.name} is better for ${platform2Data.strengths[0].toLowerCase()}.`
    },
    {
      question: 'Which platform offers better value for money?',
      answer: `Based on our analysis, ${platform1Data.features.pricing_value > platform2Data.features.pricing_value ? platform1Data.name : platform2Data.name} offers better overall value for most users.`
    },
    {
      question: 'Can I use both platforms simultaneously?',
      answer: 'Yes, many users enjoy using multiple AI platforms. You can start with free tiers on both to see which suits your preferences.'
    },
    {
      question: 'Which platform has better privacy protection?',
      answer: `Based on our privacy analysis, ${platform1Data.features.privacy > platform2Data.features.privacy ? platform1Data.name : platform2Data.name} has stronger privacy features.`
    }
  ];

  const comparisonMeta = getComparisonMeta(platform1Data.name, platform2Data.name);

  return (
    <div className="page-container">
      <SEOHead 
        title={comparisonMeta.title}
        description={comparisonMeta.description}
        keywords={[
          platform1Data.name.toLowerCase(),
          platform2Data.name.toLowerCase(),
          'comparison',
          'vs',
          'ai platform',
          'review',
          '2025'
        ]}
        ogImage={platform1Data.image || `${SITE_DOMAIN}/og-image.png`}
        canonical={`${SITE_DOMAIN}/compare/${comparisonId}`}
        ogType="article"
      />
      <Sidebar />
      
      <main className="main-content">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate('/compare')}>
          <ArrowLeft size={20} />
          <span>Back to comparisons</span>
        </button>
        
        {/* Hero Section */}
        <div className="comparison-hero-v2">
          <div className="hero-content">
            <h1 className="comparison-title">
              {platform1Data.name} vs {platform2Data.name} - Detailed Comparison
            </h1>
            
            <div className="platforms-info">
              <div className="platform-info-left">
                <div className="platform-name">{platform1Data.name}</div>
                <div className="platform-features">
                  {platform1Data.strengths.slice(0, 3).map((strength, index) => (
                    <span key={index} className="feature-tag">{strength}</span>
                  ))}
                </div>
                <div className="platform-rating-info">
                  <Star size={20} fill="currentColor" />
                  <span className="rating-number">{platform1Data.rating}</span>
                </div>
              </div>

              <div className="platform-info-right">
                <div className="platform-name">{platform2Data.name}</div>
                <div className="platform-features">
                  {platform2Data.strengths.slice(0, 3).map((strength, index) => (
                    <span key={index} className="feature-tag">{strength}</span>
                  ))}
                </div>
                <div className="platform-rating-info">
                  <Star size={20} fill="currentColor" />
                  <span className="rating-number">{platform2Data.rating}</span>
                </div>
              </div>
            </div>

            <div className="hero-actions">
              <button 
                className="hero-btn primary"
                onClick={() => {
                  const element = document.querySelector('.feature-comparison');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Read review
              </button>
              <button 
                className="hero-btn secondary"
                onClick={() => {
                  const element = document.querySelector('.chart-container');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                See differences
              </button>
              <button 
                className="hero-btn tertiary"
                onClick={() => {
                  const element = document.querySelector('.comparison-verdict');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Jump to verdict
              </button>
            </div>
          </div>
        </div>

        {/* SEO Content Block */}
        <section className="seo-comparison-block">
          <h1>{platform1Data.name} vs {platform2Data.name}: Comprehensive Comparison 2025</h1>
          <p className="seo-intro">
            Choosing between {platform1Data.name} and {platform2Data.name} for your AI companion needs? 
            Our detailed comparison covers features, pricing, user experience, and more to help you make 
            the best decision. Both platforms offer unique strengths in the AI character space.
          </p>
          
          <div className="quick-summary">
            <div className="summary-card">
              <h3>{platform1Data.name} - Best For</h3>
              <ul>
                {platform1Data.bestFor.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>
            <div className="summary-card">
              <h3>{platform2Data.name} - Best For</h3>
              <ul>
                {platform2Data.bestFor.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive Feature Comparison Chart */}
        <section className="comparison-section feature-comparison">
          <h2>Feature Comparison</h2>
          <div className="chart-container">
            <canvas id="featureChart"></canvas>
          </div>
          <div className="feature-winner-grid">
            {featureLabels.map(feature => (
              <div key={feature} className="feature-winner">
                <span className="feature-name">
                  {feature.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <span className={`winner ${winners[feature].toLowerCase().replace('.', '-')}`}>
                  {winners[feature]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="comparison-section">
          <h2>Detailed Feature Matrix</h2>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>{platform1Data.name}</th>
                  <th>{platform2Data.name}</th>
                  <th>Winner</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Overall Rating</td>
                  <td>★ {platform1Data.rating}</td>
                  <td>★ {platform2Data.rating}</td>
                  <td className="winner">
                    🏆 {platform1Data.rating > platform2Data.rating ? platform1Data.name : 
                        platform2Data.rating > platform1Data.rating ? platform2Data.name : 'Tie'}
                  </td>
                </tr>
                <tr>
                  <td>User Base</td>
                  <td>{platform1Data.users}</td>
                  <td>{platform2Data.users}</td>
                  <td className="winner">🏆 {platform2Data.users === "10M+" ? platform2Data.name : platform1Data.name}</td>
                </tr>
                <tr>
                  <td>Pricing Model</td>
                  <td>{platform1Data.pricing}</td>
                  <td>{platform2Data.pricing}</td>
                  <td className="winner">💰 Value Varies</td>
                </tr>
                {featureLabels.map(feature => (
                  <tr key={feature}>
                    <td>{feature.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
                    <td>
                      <div className="score-bar">
                        <div 
                          className="score-fill" 
                          style={{ width: `${platform1Data.features[feature]}%` }}
                        ></div>
                        <span>{platform1Data.features[feature]}/100</span>
                      </div>
                    </td>
                    <td>
                      <div className="score-bar">
                        <div 
                          className="score-fill" 
                          style={{ width: `${platform2Data.features[feature]}%` }}
                        ></div>
                        <span>{platform2Data.features[feature]}/100</span>
                      </div>
                    </td>
                    <td className="winner">🏆 {winners[feature]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing Comparison - Side by Side */}
        <section className="comparison-section">
          <h2>Pricing Comparison</h2>
          <p className="comparison-subtitle">Compare pricing tiers side-by-side</p>
          
          <div className="pricing-comparison-table">
            {/* Header Row */}
            <div className="pricing-header-row">
              <div className="tier-label">Plan Tier</div>
              <div className="platform-header platform1-header">
                <span>{platform1Data.name}</span>
              </div>
              <div className="platform-header platform2-header">
                <span>{platform2Data.name}</span>
              </div>
            </div>
            
            {/* Comparison Rows */}
            {[0, 1, 2].map((tierIndex) => {
              const tier1 = platform1Data.pricingTiers[tierIndex];
              const tier2 = platform2Data.pricingTiers[tierIndex];
              
              if (!tier1 && !tier2) return null;
              
              return (
                <div key={tierIndex} className="pricing-comparison-row">
                  <div className="tier-name">
                    <strong>{tier1?.name || tier2?.name}</strong>
                  </div>
                  
                  <div className="platform-price-cell">
                    {tier1 ? (
                      <>
                        <div className="price-tag">${tier1.price === 0 ? 'Free' : `${tier1.price}`}</div>
                        <ul className="mini-features">
                          {tier1.features.map((f, i) => (
                            <li key={i}><Check size={14} /> {f}</li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <div className="not-available">N/A</div>
                    )}
                  </div>
                  
                  <div className="platform-price-cell">
                    {tier2 ? (
                      <>
                        <div className="price-tag">${tier2.price === 0 ? 'Free' : `${tier2.price}`}</div>
                        <ul className="mini-features">
                          {tier2.features.map((f, i) => (
                            <li key={i}><Check size={14} /> {f}</li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <div className="not-available">N/A</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Strengths & Weaknesses - Comparative View */}
        <section className="comparison-section">
          <h2>Strengths & Weaknesses Analysis</h2>
          <p className="comparison-subtitle">Head-to-head comparison of pros and cons</p>
          
          <div className="strengths-comparison">
            <h3 className="subsection-title"><Check size={20} /> Strengths Comparison</h3>
            <div className="strength-weakness-grid">
              <div className="sw-header platform1-bg">{platform1Data.name}</div>
              <div className="sw-header platform2-bg">{platform2Data.name}</div>
              
              <div className="sw-content">
                <ul className="strength-list">
                  {platform1Data.strengths.map((strength, index) => (
                    <li key={index}>
                      <Check size={16} className="check-icon" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="sw-content">
                <ul className="strength-list">
                  {platform2Data.strengths.map((strength, index) => (
                    <li key={index}>
                      <Check size={16} className="check-icon" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="weaknesses-comparison">
            <h3 className="subsection-title"><X size={20} /> Weaknesses Comparison</h3>
            <div className="strength-weakness-grid">
              <div className="sw-header platform1-bg">{platform1Data.name}</div>
              <div className="sw-header platform2-bg">{platform2Data.name}</div>
              
              <div className="sw-content">
                <ul className="weakness-list">
                  {platform1Data.weaknesses.map((weakness, index) => (
                    <li key={index}>
                      <X size={16} className="x-icon" />
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="sw-content">
                <ul className="weakness-list">
                  {platform2Data.weaknesses.map((weakness, index) => (
                    <li key={index}>
                      <X size={16} className="x-icon" />
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Decision Helper */}
        <section className="comparison-section">
          <h2>Which Platform Should You Choose?</h2>
          <div className="decision-helper">
            <div className="decision-card">
              <h3>Choose {platform1Data.name} if you want:</h3>
              <ul>
                {platform1Data.uniqueFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="decision-buttons">
                <button 
                  className="cta-button secondary"
                  onClick={() => navigate(`/platform/${platform1}`)}
                >
                  Learn More About {platform1Data.name}
                </button>
                <button 
                  className="cta-button primary"
                  onClick={() => window.open(platform1Data.website || '#', '_blank')}
                >
                  Visit {platform1Data.name}
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
            
            <div className="decision-card">
              <h3>Choose {platform2Data.name} if you want:</h3>
              <ul>
                {platform2Data.uniqueFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="decision-buttons">
                <button 
                  className="cta-button secondary"
                  onClick={() => navigate(`/platform/${platform2}`)}
                >
                  Learn More About {platform2Data.name}
                </button>
                <button 
                  className="cta-button primary"
                  onClick={() => window.open(platform2Data.website || '#', '_blank')}
                >
                  Visit {platform2Data.name}
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content Block */}
        <section className="comparison-section seo-content-block">
          <h2>Complete {platform1Data.name} vs {platform2Data.name} Analysis</h2>
          
          <div className="seo-content-grid">
            <div className="seo-main-content">
              <h3>Why Compare {platform1Data.name} and {platform2Data.name}?</h3>
              <p>
                When choosing between {platform1Data.name} and {platform2Data.name}, it's essential to understand 
                their unique approaches to AI companionship. {platform1Data.name}, known for its {platform1Data.uniqueFeatures[0].toLowerCase()}, 
                offers a {platform1Data.category.toLowerCase()} experience that focuses on {platform1Data.strengths[0].toLowerCase()}. 
                Meanwhile, {platform2Data.name} excels in {platform2Data.uniqueFeatures[0].toLowerCase()}, providing users with 
                {platform2Data.strengths[0].toLowerCase()}.
              </p>

              <h3>Key Differences in AI Technology</h3>
              <p>
                The fundamental difference between these platforms lies in their core functionality. 
                {platform1Data.name} specializes in {platform1Data.strengths[1] ? platform1Data.strengths[1].toLowerCase() : platform1Data.strengths[0].toLowerCase()}, 
                while {platform2Data.name} focuses on {platform2Data.strengths[1] ? platform2Data.strengths[1].toLowerCase() : platform2Data.strengths[0].toLowerCase()}. 
                This makes {platform1Data.name} ideal for users seeking {platform1Data.bestFor[0].toLowerCase()}, 
                whereas {platform2Data.name} better serves those interested in {platform2Data.bestFor[0].toLowerCase()}.
              </p>

              <h3>Pricing and Value Comparison</h3>
              <p>
                From a pricing perspective, {platform1Data.name} follows a {platform1Data.pricing.toLowerCase()} model, 
                while {platform2Data.name} operates on a {platform2Data.pricing.toLowerCase()} basis. 
                Users should consider their budget and usage patterns when deciding between these AI companion platforms. 
                {platform1Data.name} may be more suitable for those who {platform1Data.bestFor[1] ? platform1Data.bestFor[1].toLowerCase() : 'value premium features'}, 
                while {platform2Data.name} appeals to users who {platform2Data.bestFor[1] ? platform2Data.bestFor[1].toLowerCase() : 'prefer different approaches'}.
              </p>
            </div>

            <div className="seo-sidebar">
              <div className="pros-cons-summary">
                <div className="pros-summary">
                  <h4>{platform1Data.name} Advantages</h4>
                  <ul>
                    {platform1Data.strengths.slice(0, 3).map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>

                <div className="cons-summary">
                  <h4>{platform1Data.name} Limitations</h4>
                  <ul>
                    {platform1Data.weaknesses.slice(0, 2).map((weakness, index) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </div>

                <div className="pros-summary">
                  <h4>{platform2Data.name} Advantages</h4>
                  <ul>
                    {platform2Data.strengths.slice(0, 3).map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>

                <div className="cons-summary">
                  <h4>{platform2Data.name} Limitations</h4>
                  <ul>
                    {platform2Data.weaknesses.slice(0, 2).map((weakness, index) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="comparison-verdict">
                <h4>Bottom Line</h4>
                <p>
                  Choose {platform1Data.name} if you prioritize {platform1Data.uniqueFeatures[0].toLowerCase()} and 
                  {platform1Data.strengths[0].toLowerCase()}. Opt for {platform2Data.name} if you value 
                  {platform2Data.uniqueFeatures[0].toLowerCase()} and {platform2Data.strengths[0].toLowerCase()}. 
                  Both platforms offer solid AI companion experiences with distinct advantages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content Block - Expert Analysis */}
        <section className="comparison-section expert-analysis-block">
          <h2>Expert Analysis: {platform1Data.name} vs {platform2Data.name}</h2>
          
          <div className="expert-content">
            <div className="analysis-intro">
              <p>
                After extensive testing and analysis of both {platform1Data.name} and {platform2Data.name}, 
                our AI companion experts have identified key factors that make each platform unique. This comprehensive 
                review examines user experience, feature depth, pricing models, and long-term value to help you make 
                an informed decision about your AI companion platform choice.
              </p>
            </div>

            <div className="expert-insights-grid">
              <div className="insight-card">
                <h3>🎯 Best Use Cases</h3>
                <div className="use-case-comparison">
                  <div className="platform-use-case">
                    <h4>{platform1Data.name}</h4>
                    <p>Ideal for users who prioritize {platform1Data.strengths[0].toLowerCase()} and value {platform1Data.uniqueFeatures[0].toLowerCase()}. 
                    Perfect for {platform1Data.bestFor[0].toLowerCase()} seeking a {platform1Data.category.toLowerCase()} experience.</p>
                  </div>
                  <div className="platform-use-case">
                    <h4>{platform2Data.name}</h4>
                    <p>Best suited for users looking for {platform2Data.strengths[0].toLowerCase()} with focus on {platform2Data.uniqueFeatures[0].toLowerCase()}. 
                    Excellent choice for {platform2Data.bestFor[0].toLowerCase()} who prefer a {platform2Data.category.toLowerCase()} approach.</p>
                  </div>
                </div>
              </div>

              <div className="insight-card">
                <h3>💡 Key Recommendations</h3>
                <div className="recommendations">
                  <div className="recommendation-item">
                    <strong>For Beginners:</strong> {platform2Data.rating >= platform1Data.rating ? platform2Data.name : platform1Data.name} offers 
                    a more accessible entry point with {platform2Data.rating >= platform1Data.rating ? platform2Data.strengths[1] || platform2Data.strengths[0] : platform1Data.strengths[1] || platform1Data.strengths[0]}.
                  </div>
                  <div className="recommendation-item">
                    <strong>For Advanced Users:</strong> {platform1Data.category === 'Premium' ? platform1Data.name : platform2Data.name} provides 
                    deeper customization options and advanced features for experienced users.
                  </div>
                  <div className="recommendation-item">
                    <strong>Budget Conscious:</strong> {platform1Data.pricing.includes('Free') || platform2Data.pricing.includes('Free') ? 
                    (platform1Data.pricing.includes('Free') ? platform1Data.name : platform2Data.name) : 
                    'Both platforms offer competitive pricing'} offers the best value proposition for cost-conscious users.
                  </div>
                </div>
              </div>

              <div className="insight-card">
                <h3>🔮 Future Outlook</h3>
                <p>
                  The AI companion space continues evolving rapidly. Both {platform1Data.name} and {platform2Data.name} 
                  represent different philosophies in AI development - {platform1Data.name} focusing on {platform1Data.uniqueFeatures[0].toLowerCase()} 
                  while {platform2Data.name} emphasizes {platform2Data.uniqueFeatures[0].toLowerCase()}. Consider your long-term needs 
                  and which platform's roadmap aligns better with your expectations for AI companion technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="comparison-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <h3>
                  <HelpCircle size={16} />
                  {item.question}
                </h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Comparisons */}
        <section className="comparison-section">
          <h2>Related Comparisons</h2>
          <div className="related-comparisons">
            <div className="related-grid">
              <div 
                className="related-card"
                onClick={() => navigate('/compare/lovescape-vs-nomi-ai')}
              >
                <h4>Lovescape vs Nomi.ai</h4>
                <p>Premium AI companions comparison</p>
              </div>
              <div 
                className="related-card"
                onClick={() => navigate('/compare/character-ai-vs-chai-ai')}
              >
                <h4>Character.AI vs Chai AI</h4>
                <p>Community-driven platforms</p>
              </div>
              <div 
                className="related-card"
                onClick={() => navigate('/compare/replika-vs-anima-ai')}
              >
                <h4>Replika vs Anima AI</h4>
                <p>Wellness-focused companions</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ComparisonDetailPage;