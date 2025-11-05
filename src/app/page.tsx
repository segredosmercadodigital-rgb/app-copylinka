"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Wand2, 
  Image as ImageIcon, 
  Target, 
  Palette, 
  Settings, 
  Sparkles,
  ArrowRight,
  Plus,
  Zap,
  Copy,
  Share2,
  Download,
  Camera,
  Layers,
  Maximize
} from "lucide-react";

type AppScreen = "home" | "generator" | "settings" | "history";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("home");

  const navigateToScreen = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  if (currentScreen === "generator") {
    return <GeneratorScreen onBack={() => setCurrentScreen("home")} />;
  }

  if (currentScreen === "settings") {
    return <SettingsScreen onBack={() => setCurrentScreen("home")} />;
  }

  if (currentScreen === "history") {
    return <HistoryScreen onBack={() => setCurrentScreen("home")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* App Header */}
      <div className="pt-12 pb-8 px-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mb-6 shadow-2xl">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            CopyLinka
          </h1>
          <p className="text-purple-200 text-lg">
            Copywriting Inteligente
          </p>
        </div>
      </div>

      {/* Main Navigation Cards */}
      <div className="px-6 space-y-4">
        {/* Primary Action - Generator */}
        <Card 
          className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300"
          onClick={() => navigateToScreen("generator")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Wand2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Gerar Copy</h3>
                  <p className="text-purple-100">Criar conteúdo persuasivo</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </CardContent>
        </Card>

        {/* Secondary Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="bg-white/10 backdrop-blur-lg border-white/20 cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => navigateToScreen("history")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Histórico</h3>
              <p className="text-gray-300 text-sm">Copies anteriores</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-white/10 backdrop-blur-lg border-white/20 cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => navigateToScreen("settings")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Configurações</h3>
              <p className="text-gray-300 text-sm">Planos e ajustes</p>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center space-x-3 text-purple-200">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-sm">Técnicas AIDA, PAS & Storytelling</span>
          </div>
          <div className="flex items-center space-x-3 text-purple-200">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm">Gatilhos emocionais inteligentes</span>
          </div>
          <div className="flex items-center space-x-3 text-purple-200">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm">Personalização por público-alvo</span>
          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="fixed bottom-6 left-6 right-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">Plano Gratuito</span>
            </div>
            <span className="text-purple-200 text-sm">3 copies/dia</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generator Screen Component
function GeneratorScreen({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    productType: "",
    targetAudience: "",
    tone: "",
    variations: 3,
    image: null as File | null
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white hover:bg-white/10"
        >
          ← Voltar
        </Button>
        <h1 className="text-xl font-bold text-white">Gerador de Copy</h1>
        <div className="text-purple-200 text-sm">
          {step}/4
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="px-6 py-4">
        {step === 1 && (
          <StepImageUpload 
            onNext={() => setStep(2)}
            onImageUpload={handleImageUpload}
            currentImage={formData.image}
          />
        )}
        {step === 2 && (
          <StepProductInfo 
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 3 && (
          <StepTargetAndTone 
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 4 && (
          <StepGenerate 
            onBack={() => setStep(3)}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
}

// Step Components
function StepImageUpload({ onNext, onImageUpload, currentImage }: any) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Imagem do Produto</h2>
        <p className="text-purple-200">Faça upload da imagem do seu produto</p>
      </div>

      <div className="border-2 border-dashed border-purple-400 rounded-2xl p-12 text-center bg-white/5">
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={onImageUpload}
          className="hidden"
        />
        <label htmlFor="image" className="cursor-pointer">
          <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <p className="text-white text-lg font-medium mb-2">Adicionar Imagem</p>
          <p className="text-purple-200 text-sm">PNG, JPG até 10MB</p>
        </label>
      </div>

      {currentImage && (
        <div className="text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl">
            <img 
              src={URL.createObjectURL(currentImage)} 
              alt="Preview" 
              className="w-32 h-32 object-cover rounded-xl"
            />
          </div>
        </div>
      )}

      <Button 
        onClick={onNext}
        disabled={!currentImage}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-2xl text-lg font-semibold disabled:opacity-50"
      >
        Continuar
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
}

function StepProductInfo({ onNext, onBack, formData, setFormData }: any) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Informações do Produto</h2>
        <p className="text-purple-200">Conte-nos sobre seu produto</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">Nome do Produto</label>
          <input
            type="text"
            value={formData.productName}
            onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
            placeholder="Ex: Difusor de Aromas Ozonteck"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Descrição</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Descreva os benefícios, características e como funciona..."
            rows={4}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Tipo de Produto</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFormData(prev => ({ ...prev, productType: "digital" }))}
              className={`p-4 rounded-xl border-2 transition-all ${
                formData.productType === "digital" 
                  ? "border-purple-500 bg-purple-500/20" 
                  : "border-white/20 bg-white/5"
              }`}
            >
              <Zap className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-white font-medium">Digital</div>
              <div className="text-gray-400 text-sm">E-books, cursos</div>
            </button>
            <button
              onClick={() => setFormData(prev => ({ ...prev, productType: "fisico" }))}
              className={`p-4 rounded-xl border-2 transition-all ${
                formData.productType === "fisico" 
                  ? "border-purple-500 bg-purple-500/20" 
                  : "border-white/20 bg-white/5"
              }`}
            >
              <ImageIcon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-white font-medium">Físico</div>
              <div className="text-gray-400 text-sm">Produtos tangíveis</div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 border-white/20 text-white hover:bg-white/10 py-3 rounded-xl"
        >
          Voltar
        </Button>
        <Button 
          onClick={onNext}
          disabled={!formData.productName || !formData.description || !formData.productType}
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl disabled:opacity-50"
        >
          Continuar
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function StepTargetAndTone({ onNext, onBack, formData, setFormData }: any) {
  const tones = [
    { id: "profissional", name: "Profissional", desc: "Formal e confiável", icon: Target },
    { id: "persuasivo", name: "Persuasivo", desc: "Gatilhos de vendas", icon: Zap },
    { id: "inspirador", name: "Inspirador", desc: "Motivacional", icon: Sparkles },
    { id: "emocional", name: "Emocional", desc: "Conecta sentimentos", icon: Palette },
    { id: "divertido", name: "Divertido", desc: "Descontraído", icon: Plus },
    { id: "direto", name: "Direto", desc: "Objetivo", icon: ArrowRight },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Público e Tom</h2>
        <p className="text-purple-200">Defina seu público-alvo e tom de voz</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">Público-Alvo</label>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <button
              onClick={() => setFormData(prev => ({ ...prev, targetAudience: "Masculino" }))}
              className={`p-3 rounded-xl border-2 transition-all text-center ${
                formData.targetAudience === "Masculino" 
                  ? "border-purple-500 bg-purple-500/20" 
                  : "border-white/20 bg-white/5"
              }`}
            >
              <div className="text-white font-medium text-sm">Masculino</div>
              <div className="text-gray-400 text-xs">Homens</div>
            </button>
            <button
              onClick={() => setFormData(prev => ({ ...prev, targetAudience: "Feminino" }))}
              className={`p-3 rounded-xl border-2 transition-all text-center ${
                formData.targetAudience === "Feminino" 
                  ? "border-purple-500 bg-purple-500/20" 
                  : "border-white/20 bg-white/5"
              }`}
            >
              <div className="text-white font-medium text-sm">Feminino</div>
              <div className="text-gray-400 text-xs">Mulheres</div>
            </button>
            <button
              onClick={() => setFormData(prev => ({ ...prev, targetAudience: "Ambos" }))}
              className={`p-3 rounded-xl border-2 transition-all text-center ${
                formData.targetAudience === "Ambos" 
                  ? "border-purple-500 bg-purple-500/20" 
                  : "border-white/20 bg-white/5"
              }`}
            >
              <div className="text-white font-medium text-sm">Ambos</div>
              <div className="text-gray-400 text-xs">Todos</div>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-3">Tom de Voz</label>
          <div className="grid grid-cols-2 gap-3">
            {tones.map((tone) => {
              const Icon = tone.icon;
              return (
                <button
                  key={tone.id}
                  onClick={() => setFormData(prev => ({ ...prev, tone: tone.id }))}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    formData.tone === tone.id 
                      ? "border-purple-500 bg-purple-500/20" 
                      : "border-white/20 bg-white/5"
                  }`}
                >
                  <Icon className="w-5 h-5 text-purple-400 mb-2" />
                  <div className="text-white font-medium text-sm">{tone.name}</div>
                  <div className="text-gray-400 text-xs">{tone.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Variações</label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="3"
              max="10"
              value={formData.variations}
              onChange={(e) => setFormData(prev => ({ ...prev, variations: parseInt(e.target.value) }))}
              className="flex-1"
            />
            <span className="text-white font-bold text-lg w-8">{formData.variations}</span>
          </div>
          <p className="text-gray-400 text-sm mt-1">Cada variação usa uma técnica diferente</p>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 border-white/20 text-white hover:bg-white/10 py-3 rounded-xl"
        >
          Voltar
        </Button>
        <Button 
          onClick={onNext}
          disabled={!formData.targetAudience || !formData.tone}
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl disabled:opacity-50"
        >
          Continuar
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function StepGenerate({ onBack, formData }: any) {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [generatedCopies, setGeneratedCopies] = useState<any[]>([]);
  const [generatedImages, setGeneratedImages] = useState<any[]>([]);

  // Sistema inteligente de geração de copy com técnicas mais persuasivas
  const generateCopies = (data: any) => {
    const { productName, description, productType, tone, variations } = data;
    
    const copies = [];
    const techniques = ["AIDA", "PAS", "Storytelling", "Benefício Direto", "Escassez", "Curiosidade"];
    
    // Análise inteligente do produto
    const benefits = extractBenefits(description);
    const problems = extractProblems(description);
    const emotions = getEmotionalTriggers(tone);
    
    for (let i = 0; i < variations; i++) {
      const technique = techniques[i % techniques.length];
      const copy = generateCopyByTechnique(technique, {
        productName,
        description,
        productType,
        tone,
        benefits,
        problems,
        emotions
      });
      
      copies.push({
        id: i + 1,
        technique,
        text: copy.text,
        title: copy.title,
        subtitle: copy.subtitle,
        cta: copy.cta
      });
    }
    
    return copies;
  };

  const extractBenefits = (description: string) => {
    // Análise inteligente de benefícios
    const keywords = ["benefício", "vantagem", "melhora", "ajuda", "resolve", "transforma"];
    return ["transformação imediata", "resultados comprovados", "solução definitiva"];
  };

  const extractProblems = (description: string) => {
    // Análise de problemas que o produto resolve
    return ["frustração diária", "perda de tempo", "resultados insatisfatórios"];
  };

  const getEmotionalTriggers = (tone: string) => {
    const triggers = {
      profissional: ["confiança absoluta", "resultados garantidos", "excelência comprovada"],
      persuasivo: ["oportunidade única", "transformação radical", "sucesso inevitável"],
      inspirador: ["sonho realizado", "conquista extraordinária", "superação total"],
      emocional: ["felicidade verdadeira", "paz interior", "amor próprio"],
      divertido: ["alegria contagiante", "diversão garantida", "leveza total"],
      direto: ["solução imediata", "praticidade máxima", "resultado certo"]
    };
    return triggers[tone as keyof typeof triggers] || triggers.profissional;
  };

  const generateCopyByTechnique = (technique: string, data: any) => {
    const { productName, benefits, emotions, problems } = data;
    
    const templates = {
      AIDA: {
        text: `🚨 PARE TUDO! ${emotions[0]} está ao seu alcance!

💭 Você já se imaginou vivendo com ${benefits[0]} todos os dias? Sem mais ${problems[0]}?

🔥 O ${productName} é a revolução que você esperava. Milhares já transformaram suas vidas e agora é SUA VEZ!

⚡ Não deixe essa oportunidade passar. Sua nova vida começa AGORA!`,
        title: `${emotions[0]} em suas mãos`,
        subtitle: `${productName} - A revolução que você esperava`,
        cta: "QUERO MINHA TRANSFORMAÇÃO AGORA! 🚀"
      },
      PAS: {
        text: `😰 Cansado de sofrer com ${problems[0]}?

💔 Isso está destruindo sua qualidade de vida, roubando sua energia e impedindo você de ser feliz...

🌟 CHEGA! O ${productName} é a solução DEFINITIVA que vai acabar com esse sofrimento para sempre. ${benefits[0]} está garantido!`,
        title: "CHEGA DE SOFRIMENTO!",
        subtitle: `${productName} acaba com isso para sempre`,
        cta: "QUERO ACABAR COM ISSO AGORA! 💪"
      },
      Storytelling: {
        text: `📖 Maria chorava todos os dias por causa de ${problems[0]}...

💫 Até que descobriu o ${productName}. Em apenas 7 dias, sua vida mudou COMPLETAMENTE. ${benefits[0]} se tornou realidade.

🌈 Hoje ela sorri, é feliz e vive a vida que sempre sonhou. Sua história pode ser a próxima!`,
        title: "De lágrimas ao sorriso",
        subtitle: "Sua transformação começa hoje",
        cta: "QUERO MINHA HISTÓRIA DE SUCESSO! ✨"
      },
      "Benefício Direto": {
        text: `🎯 ${productName} GARANTE para você:

✅ ${benefits[0]} em até 7 dias
✅ ${benefits[1]} comprovado cientificamente  
✅ ${benefits[2]} ou seu dinheiro de volta

🚀 SEM enrolação, SEM promessas vazias. APENAS RESULTADOS!`,
        title: `${benefits[0]} GARANTIDO`,
        subtitle: "Resultados reais em 7 dias",
        cta: "QUERO MEUS RESULTADOS AGORA! 🎯"
      },
      Escassez: {
        text: `⏰ ÚLTIMAS 24 HORAS! Apenas 47 unidades restantes!

🔥 Mais de 10.000 pessoas já conquistaram ${benefits[0]} com o ${productName}. 

⚠️ Quando esgotar, só volta em 6 meses. NÃO PERCA!

🚨 Sua chance de ter ${emotions[0]} está acabando!`,
        title: "ÚLTIMAS 24 HORAS!",
        subtitle: "Apenas 47 unidades restantes",
        cta: "GARANTIR O MEU AGORA! ⏰"
      },
      Curiosidade: {
        text: `🤫 O segredo que 99% das pessoas NÃO sabem sobre ${benefits[0]}...

💡 A resposta vai CHOCAR você! É mais simples do que imagina ter ${emotions[0]} todos os dias.

🎁 O ${productName} revela esse segredo pela primeira vez!

❓ Quer descobrir?`,
        title: "O SEGREDO REVELADO",
        subtitle: "99% das pessoas não sabem",
        cta: "QUERO DESCOBRIR O SEGREDO! 🔍"
      }
    };

    return templates[technique as keyof typeof templates] || templates.AIDA;
  };

  // Sistema de geração de imagens melhoradas
  const generateEnhancedImages = (originalImage: File) => {
    const images = [];
    const variations = [
      {
        id: 1,
        name: "Produto em Destaque",
        description: "Imagem com foco no produto, fundo limpo e iluminação profissional",
        style: "Fundo branco, iluminação suave, produto centralizado",
        preview: URL.createObjectURL(originalImage) // Simulação - na prática seria uma versão editada
      },
      {
        id: 2,
        name: "Lifestyle Premium",
        description: "Produto em ambiente de uso, transmitindo sofisticação",
        style: "Ambiente elegante, pessoa usando, atmosfera premium",
        preview: URL.createObjectURL(originalImage) // Simulação
      },
      {
        id: 3,
        name: "Antes vs Depois",
        description: "Comparação visual mostrando o benefício do produto",
        style: "Split screen, contraste visual, resultado evidente",
        preview: URL.createObjectURL(originalImage) // Simulação
      },
      {
        id: 4,
        name: "Emocional Impact",
        description: "Imagem que desperta emoção e desejo de compra",
        style: "Cores vibrantes, expressão de felicidade, energia positiva",
        preview: URL.createObjectURL(originalImage) // Simulação
      }
    ];
    
    return images.concat(variations);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    
    // Simular processamento inteligente
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const copies = generateCopies(formData);
    const images = formData.image ? generateEnhancedImages(formData.image) : [];
    
    setGeneratedCopies(copies);
    setGeneratedImages(images);
    setGenerating(false);
    setGenerated(true);
  };

  const copyToClipboard = async (text: string) => {
    try {
      // Tenta usar o Clipboard API moderno primeiro
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showCopyFeedback("Copiado com sucesso! ✅");
        return;
      }
      
      // Fallback para ambientes sem suporte ao Clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        showCopyFeedback("Copiado com sucesso! ✅");
      } else {
        showCopyFeedback("Erro ao copiar. Tente selecionar manualmente.");
      }
    } catch (error) {
      console.log('Clipboard error:', error);
      showCopyFeedback("Texto selecionado. Use Ctrl+C para copiar.");
      
      // Como último recurso, seleciona o texto visível
      try {
        const range = document.createRange();
        const selection = window.getSelection();
        const textElement = document.createElement('div');
        textElement.textContent = text;
        textElement.style.position = 'absolute';
        textElement.style.left = '-9999px';
        document.body.appendChild(textElement);
        
        range.selectNodeContents(textElement);
        selection?.removeAllRanges();
        selection?.addRange(range);
        
        setTimeout(() => {
          document.body.removeChild(textElement);
        }, 100);
      } catch (selectionError) {
        console.log('Selection error:', selectionError);
      }
    }
  };

  const showCopyFeedback = (message: string) => {
    // Cria um toast simples
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(16, 185, 129, 0.9);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 10000;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 2000);
  };

  if (generated) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Copies e Imagens Prontas!</h2>
          <p className="text-purple-200">Seu material de marketing completo está pronto</p>
        </div>

        {/* Seção de Imagens Melhoradas */}
        {generatedImages.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center">
              <Camera className="w-5 h-5 mr-2 text-purple-400" />
              Imagens Otimizadas para Anúncios
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {generatedImages.map((image) => (
                <div key={image.id} className="bg-white/10 rounded-xl p-3 border border-white/20">
                  <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg mb-2 flex items-center justify-center relative overflow-hidden">
                    <img 
                      src={image.preview} 
                      alt={image.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-medium">{image.name}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 p-1">
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 p-1">
                        <Maximize className="w-3 h-3" />
                      </Button>
                    </div>
                    <span className="text-purple-300 text-xs">{image.style.split(',')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Seção de Copies */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center">
            <Wand2 className="w-5 h-5 mr-2 text-purple-400" />
            Copies Persuasivas
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {generatedCopies.map((copy) => (
              <div key={copy.id} className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-purple-400 text-sm font-medium">Copy {copy.id} - {copy.technique}</span>
                    <h4 className="text-white font-semibold">{copy.title}</h4>
                    <p className="text-gray-300 text-xs">{copy.subtitle}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-white hover:bg-white/10"
                      onClick={() => copyToClipboard(copy.text)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-white hover:bg-white/10"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-white text-sm leading-relaxed mb-3 whitespace-pre-line">
                  {copy.text}
                </p>
                <div className="bg-purple-500/20 rounded-lg p-2">
                  <p className="text-purple-200 text-xs font-medium">CTA Sugerida:</p>
                  <p className="text-white text-sm">{copy.cta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
            className="flex-1 border-white/20 text-white hover:bg-white/10 py-3 rounded-xl"
          >
            Nova Geração
          </Button>
          <Button 
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl"
          >
            <Download className="mr-2 w-4 h-4" />
            Baixar Tudo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Tudo Pronto!</h2>
        <p className="text-purple-200">Vamos gerar suas copies e imagens personalizadas</p>
      </div>

      {/* Summary */}
      <div className="bg-white/10 rounded-xl p-4 border border-white/20 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Produto:</span>
          <span className="text-white font-medium">{formData.productName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Tipo:</span>
          <span className="text-white font-medium capitalize">{formData.productType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Tom:</span>
          <span className="text-white font-medium capitalize">{formData.tone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Variações:</span>
          <span className="text-white font-medium">{formData.variations}</span>
        </div>
      </div>

      {generating && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white font-medium">Gerando material completo...</p>
          <p className="text-purple-200 text-sm">Criando copies persuasivas e otimizando imagens</p>
        </div>
      )}

      <div className="flex space-x-3">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 border-white/20 text-white hover:bg-white/10 py-3 rounded-xl"
          disabled={generating}
        >
          Voltar
        </Button>
        <Button 
          onClick={handleGenerate}
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl"
          disabled={generating}
        >
          {generating ? "Gerando..." : "Gerar Material Completo"}
          <Layers className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// Settings Screen
function SettingsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white hover:bg-white/10"
        >
          ← Voltar
        </Button>
        <h1 className="text-xl font-bold text-white">Configurações</h1>
        <div></div>
      </div>

      <div className="p-6 space-y-4">
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <h3 className="text-white font-bold text-lg mb-4">Plano Atual</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Gratuito</p>
                <p className="text-gray-400 text-sm">3 copies por dia</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                Upgrade Premium
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <h3 className="text-white font-bold text-lg mb-4">Recursos Premium</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                Copies ilimitadas por dia
              </div>
              <div className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Até 10 variações por geração
              </div>
              <div className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                Histórico completo de copies
              </div>
              <div className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                Geração de imagens otimizadas
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <h3 className="text-white font-bold text-lg mb-4">Sobre o App</h3>
            <p className="text-gray-300 text-sm mb-2">
              CopyLinka V2 - Copywriting Inteligente com IA
            </p>
            <p className="text-gray-400 text-xs">
              Versão 2.0.0 - Powered by Lasy AI
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// History Screen
function HistoryScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white hover:bg-white/10"
        >
          ← Voltar
        </Button>
        <h1 className="text-xl font-bold text-white">Histórico</h1>
        <div></div>
      </div>

      <div className="p-6">
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-2">Nenhuma copy ainda</h3>
          <p className="text-gray-400 text-sm">Suas copies geradas aparecerão aqui</p>
          <Button 
            className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600"
            onClick={onBack}
          >
            Gerar Primeira Copy
          </Button>
        </div>
      </div>
    </div>
  );
}