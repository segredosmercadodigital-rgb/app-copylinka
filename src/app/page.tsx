"use client";

import { useState } from "react";
import { ProductForm } from "@/components/ProductForm";
import { GeneratedContent } from "@/components/GeneratedContent";
import { PlanIndicator } from "@/components/PlanIndicator";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Target } from "lucide-react";

interface FormData {
  productName: string;
  description: string;
  productType: "digital" | "fisico";
  targetAudience: string;
  tone: "profissional" | "persuasivo" | "divertido" | "inspirador" | "emocional" | "direto";
  variations: number;
  image: File;
}

interface GeneratedCopy {
  id: string;
  structure: "AIDA" | "PAS" | "Storytelling";
  short: string;
  medium: string;
  long: string;
  title: string;
  subtitle: string;
  cta: string;
  emotions: string[];
  benefits: string[];
}

export default function Home() {
  const [generatedContent, setGeneratedContent] = useState<{
    copies: GeneratedCopy[];
    optimizedImage: string;
    productName: string;
    analysisData: {
      mainBenefits: string[];
      problemsSolved: string[];
      emotions: string[];
      centralPromise: string;
    };
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // Sistema inteligente de geração de copy
  const generateIntelligentCopy = (data: FormData): GeneratedCopy[] => {
    const copies: GeneratedCopy[] = [];
    
    // Análise inteligente da descrição
    const benefits = extractBenefits(data.description, data.productName);
    const problems = extractProblems(data.description, data.targetAudience);
    const emotions = getEmotionalTriggers(data.tone, data.productType);
    const centralPromise = generateCentralPromise(data.productName, benefits[0]);

    const structures: Array<"AIDA" | "PAS" | "Storytelling"> = ["AIDA", "PAS", "Storytelling"];
    const ctaVariations = generateSmartCTAs(data.tone, data.productType);

    for (let i = 0; i < data.variations; i++) {
      const structure = structures[i % structures.length];
      const copy = generateCopyByStructure(structure, data, benefits, problems, emotions, i);
      
      copies.push({
        id: `copy-${i + 1}`,
        structure,
        ...copy,
        cta: ctaVariations[i % ctaVariations.length],
        emotions: emotions.slice(0, 3),
        benefits: benefits.slice(0, 3),
      });
    }

    return copies;
  };

  // Extração inteligente de benefícios
  const extractBenefits = (description: string, productName: string): string[] => {
    const benefitKeywords = [
      "melhora", "aumenta", "reduz", "elimina", "facilita", "otimiza", 
      "economiza", "acelera", "simplifica", "transforma", "garante"
    ];
    
    const benefits = [];
    const words = description.toLowerCase().split(" ");
    
    for (let i = 0; i < words.length; i++) {
      if (benefitKeywords.some(keyword => words[i].includes(keyword))) {
        const benefit = words.slice(Math.max(0, i-2), i+3).join(" ");
        benefits.push(benefit);
      }
    }

    // Benefícios padrão baseados no tipo de produto
    const defaultBenefits = [
      `Transforma sua experiência com ${productName}`,
      `Economiza tempo e esforço no seu dia a dia`,
      `Oferece resultados comprovados e duradouros`,
      `Proporciona praticidade e eficiência`,
      `Garante qualidade superior e confiabilidade`
    ];

    return benefits.length > 0 ? benefits : defaultBenefits;
  };

  // Identificação de problemas
  const extractProblems = (description: string, audience: string): string[] => {
    const problemKeywords = [
      "dificuldade", "problema", "desafio", "frustração", "demora", 
      "complicado", "difícil", "cansativo", "estressante"
    ];

    const commonProblems = [
      `Você já se sentiu frustrado com soluções que não funcionam?`,
      `Cansado de perder tempo com alternativas ineficazes?`,
      `Precisa de uma solução que realmente entregue resultados?`,
      `Está buscando algo que simplifique sua rotina?`,
      `Quer parar de se preocupar com esse problema?`
    ];

    return commonProblems;
  };

  // Gatilhos emocionais por tom
  const getEmotionalTriggers = (tone: string, productType: string): string[] => {
    const emotionalMap = {
      inspirador: ["transformação", "realização", "conquista", "superação", "crescimento"],
      persuasivo: ["urgência", "exclusividade", "oportunidade", "vantagem", "resultado"],
      emocional: ["felicidade", "tranquilidade", "segurança", "amor", "cuidado"],
      divertido: ["alegria", "diversão", "prazer", "leveza", "descontração"],
      profissional: ["eficiência", "qualidade", "confiança", "expertise", "excelência"],
      direto: ["praticidade", "simplicidade", "clareza", "objetividade", "facilidade"]
    };

    return emotionalMap[tone as keyof typeof emotionalMap] || emotionalMap.profissional;
  };

  // Promessa central
  const generateCentralPromise = (productName: string, mainBenefit: string): string => {
    return `${productName}: ${mainBenefit} de forma simples e eficaz`;
  };

  // Geração por estrutura
  const generateCopyByStructure = (
    structure: "AIDA" | "PAS" | "Storytelling",
    data: FormData,
    benefits: string[],
    problems: string[],
    emotions: string[],
    index: number
  ) => {
    const emojis = getContextualEmojis(data.productType, data.tone);
    
    switch (structure) {
      case "AIDA":
        return generateAIDACopy(data, benefits, emotions, emojis, index);
      case "PAS":
        return generatePASCopy(data, problems, benefits, emojis, index);
      case "Storytelling":
        return generateStorytellingCopy(data, benefits, emotions, emojis, index);
      default:
        return generateAIDACopy(data, benefits, emotions, emojis, index);
    }
  };

  // Estrutura AIDA
  const generateAIDACopy = (data: FormData, benefits: string[], emotions: string[], emojis: string[], index: number) => {
    const attention = [
      `${emojis[0]} Descubra o segredo que está transformando a vida de ${data.targetAudience}`,
      `${emojis[0]} Finalmente chegou a solução que você estava esperando`,
      `${emojis[0]} Pare tudo! Isso vai mudar sua perspectiva sobre ${data.productName}`
    ];

    const interest = [
      `${data.productName} não é apenas mais um produto. É uma revolução silenciosa que está acontecendo.`,
      `Enquanto outros ainda lutam com métodos antigos, você pode estar à frente com ${data.productName}.`,
      `Imagine ter acesso a algo que poucos conhecem, mas que pode transformar tudo.`
    ];

    const desire = [
      `${benefits[0]}. ${emotions[0]} é o que você vai sentir desde o primeiro momento.`,
      `Com ${data.productName}, você finalmente terá ${benefits[1]} sem complicações.`,
      `A sensação de ${emotions[1]} que você sempre quis está ao seu alcance.`
    ];

    const action = [
      `Não deixe essa oportunidade passar. Sua transformação começa agora.`,
      `Dê o primeiro passo em direção à mudança que você merece.`,
      `Junte-se a quem já descobriu o poder de ${data.productName}.`
    ];

    return {
      short: attention[index % attention.length].substring(0, 60),
      medium: `${attention[index % attention.length]} ${interest[index % interest.length]}`.substring(0, 160),
      long: `${attention[index % attention.length]} ${interest[index % interest.length]} ${desire[index % desire.length]} ${action[index % action.length]}`.substring(0, 300),
      title: `${emotions[0]} com ${data.productName}`,
      subtitle: `${benefits[0]} de forma única`
    };
  };

  // Estrutura PAS
  const generatePASCopy = (data: FormData, problems: string[], benefits: string[], emojis: string[], index: number) => {
    const problem = problems[index % problems.length];
    const agitation = [
      `Essa situação te consome energia e tempo precioso todos os dias.`,
      `Enquanto isso não se resolve, você continua perdendo oportunidades.`,
      `Cada dia que passa sem uma solução é um dia a menos de tranquilidade.`
    ];

    const solution = [
      `${data.productName} foi criado exatamente para resolver isso. ${benefits[0]} de forma natural e eficiente.`,
      `Com ${data.productName}, você transforma esse problema em uma lembrança do passado.`,
      `A solução que você procurava tem nome: ${data.productName}. ${benefits[1]} sem complicações.`
    ];

    return {
      short: `${emojis[0]} Chega de ${problem.split(' ')[0]}!`.substring(0, 60),
      medium: `${problem} ${agitation[index % agitation.length]}`.substring(0, 160),
      long: `${problem} ${agitation[index % agitation.length]} ${solution[index % solution.length]}`.substring(0, 300),
      title: `Liberte-se com ${data.productName}`,
      subtitle: `A solução que você procurava`
    };
  };

  // Estrutura Storytelling
  const generateStorytellingCopy = (data: FormData, benefits: string[], emotions: string[], emojis: string[], index: number) => {
    const stories = [
      `Era uma vez alguém como você, que buscava ${benefits[0]}. Até descobrir ${data.productName}.`,
      `Imagine acordar amanhã e sentir que tudo mudou. Essa é a magia de ${data.productName}.`,
      `Há pessoas que ainda não sabem que existe uma forma melhor. Você não precisa ser uma delas.`
    ];

    const connection = [
      `A transformação começou no primeiro dia. ${emotions[0]} tomou conta de tudo.`,
      `O que parecia impossível se tornou natural. ${benefits[1]} finalmente aconteceu.`,
      `A diferença foi tão clara que não dava para voltar atrás. ${emotions[1]} era real.`
    ];

    const invitation = [
      `Sua história de transformação pode começar hoje. ${data.productName} está aqui para isso.`,
      `Não é sobre o produto. É sobre quem você se torna com ele.`,
      `O próximo capítulo da sua jornada começa com uma escolha simples.`
    ];

    return {
      short: `${emojis[0]} Sua transformação começa aqui`.substring(0, 60),
      medium: `${stories[index % stories.length]} ${connection[index % connection.length]}`.substring(0, 160),
      long: `${stories[index % stories.length]} ${connection[index % connection.length]} ${invitation[index % invitation.length]}`.substring(0, 300),
      title: `Transforme sua história`,
      subtitle: `Com ${data.productName} ao seu lado`
    };
  };

  // CTAs inteligentes
  const generateSmartCTAs = (tone: string, productType: string): string[] => {
    const ctaMap = {
      inspirador: [
        "Quero começar minha transformação 🌟",
        "Estou pronto para essa mudança ✨",
        "Quero descobrir meu potencial 🚀"
      ],
      persuasivo: [
        "Quero aproveitar essa oportunidade 🔥",
        "Não posso perder isso 💎",
        "Quero garantir o meu agora ⚡"
      ],
      emocional: [
        "Quero sentir essa diferença 💝",
        "Preciso dessa tranquilidade 🌸",
        "Quero cuidar de mim assim 🤗"
      ],
      divertido: [
        "Bora experimentar isso! 🎉",
        "Quero me divertir também 😄",
        "Conta comigo nessa! 🎈"
      ],
      profissional: [
        "Quero conhecer a solução 📋",
        "Preciso de mais informações 📊",
        "Vamos conversar sobre isso 🤝"
      ],
      direto: [
        "Quero saber mais 📲",
        "Me envie os detalhes 📝",
        "Como posso adquirir? 💬"
      ]
    };

    return ctaMap[tone as keyof typeof ctaMap] || ctaMap.profissional;
  };

  // Emojis contextuais
  const getContextualEmojis = (productType: string, tone: string): string[] => {
    const emojiMap = {
      digital: ["💻", "📱", "⚡", "🚀", "💡"],
      fisico: ["🎁", "✨", "🌟", "💎", "🔥"]
    };

    return emojiMap[productType] || emojiMap.fisico;
  };

  const generateContent = async (data: FormData) => {
    setLoading(true);
    try {
      // Simular processamento inteligente
      await new Promise(resolve => setTimeout(resolve, 2000));

      const copies = generateIntelligentCopy(data);
      const optimizedImage = URL.createObjectURL(data.image);

      // Análise dos dados
      const analysisData = {
        mainBenefits: extractBenefits(data.description, data.productName),
        problemsSolved: extractProblems(data.description, data.targetAudience),
        emotions: getEmotionalTriggers(data.tone, data.productType),
        centralPromise: generateCentralPromise(data.productName, extractBenefits(data.description, data.productName)[0])
      };

      setGeneratedContent({
        copies,
        optimizedImage,
        productName: data.productName,
        analysisData
      });
    } catch (error) {
      console.error("Erro ao gerar conteúdo:", error);
      alert("Erro ao gerar conteúdo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              CopyLinka V2
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Copywriting Inteligente com IA Avançada
            </p>
            <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Técnicas AIDA, PAS & Storytelling</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>Gatilhos Emocionais Inteligentes</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-500" />
                <span>Personalização por Público</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <PlanIndicator />

        {!generatedContent ? (
          <ProductForm onGenerate={generateContent} />
        ) : (
          <div>
            <div className="text-center mb-6">
              <Button 
                onClick={() => setGeneratedContent(null)} 
                variant="outline"
                className="bg-white hover:bg-gray-50"
              >
                ← Gerar Novo Conteúdo
              </Button>
            </div>
            <GeneratedContent {...generatedContent} />
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 text-center max-w-md">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Gerando Conteúdo Inteligente</h3>
              <p className="text-gray-600 text-sm">
                Analisando seu produto e criando copies personalizadas com técnicas avançadas de copywriting...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            Powered by CopyLinka V2 - Copywriting Inteligente com IA
          </p>
        </div>
      </footer>
    </div>
  );
}