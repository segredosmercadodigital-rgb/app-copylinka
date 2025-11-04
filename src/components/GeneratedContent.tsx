"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Send, Copy, Eye, Sparkles, Target, Heart, Zap } from "lucide-react";

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

interface GeneratedContentProps {
  copies: GeneratedCopy[];
  optimizedImage: string;
  productName: string;
  analysisData: {
    mainBenefits: string[];
    problemsSolved: string[];
    emotions: string[];
    centralPromise: string;
  };
}

export function GeneratedContent({ copies, optimizedImage, productName, analysisData }: GeneratedContentProps) {
  const [selectedCopy, setSelectedCopy] = useState(0);
  const [selectedLength, setSelectedLength] = useState<"short" | "medium" | "long">("long");

  const sendToWhatsApp = (copy: GeneratedCopy, length: "short" | "medium" | "long") => {
    const copyText = copy[length];
    const message = `${copyText}\n\n${copy.cta}\n\n---\nMensagem gerada automaticamente pelo CopyLinka IA.\nVocê recebeu esta mensagem porque demonstrou interesse em nossos produtos.\nPara não receber mais mensagens, responda 'PARAR'.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Texto copiado para a área de transferência!");
  };

  const getStructureColor = (structure: string) => {
    switch (structure) {
      case "AIDA": return "bg-blue-100 text-blue-800";
      case "PAS": return "bg-red-100 text-red-800";
      case "Storytelling": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStructureDescription = (structure: string) => {
    switch (structure) {
      case "AIDA": return "Atenção → Interesse → Desejo → Ação";
      case "PAS": return "Problema → Agitação → Solução";
      case "Storytelling": return "História → Conexão → Convite";
      default: return "";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Análise Inteligente */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Sparkles className="w-5 h-5" />
            Análise Inteligente do Produto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Benefícios Principais
              </h4>
              <ul className="space-y-1">
                {analysisData.mainBenefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="text-sm text-gray-700">• {benefit}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Gatilhos Emocionais
              </h4>
              <div className="flex flex-wrap gap-1">
                {analysisData.emotions.slice(0, 4).map((emotion, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {emotion}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Promessa Central
              </h4>
              <p className="text-sm text-gray-700">{analysisData.centralPromise}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Imagem Otimizada */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Imagem do Produto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <img 
              src={optimizedImage} 
              alt={productName} 
              className="max-w-md mx-auto rounded-lg shadow-lg"
            />
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg">{copies[selectedCopy]?.title}</h3>
              <p className="text-gray-600">{copies[selectedCopy]?.subtitle}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Copies Geradas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Copies Geradas ({copies.length} variações)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">Visão Geral</TabsTrigger>
              <TabsTrigger value="detailed">Análise Detalhada</TabsTrigger>
            </TabsList>
            
            <TabsContent value="grid" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {copies.map((copy, index) => (
                  <Card 
                    key={copy.id} 
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedCopy === index ? 'ring-2 ring-purple-500 shadow-lg' : ''
                    }`} 
                    onClick={() => setSelectedCopy(index)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Copy {index + 1}</CardTitle>
                        <Badge className={getStructureColor(copy.structure)}>
                          {copy.structure}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        {getStructureDescription(copy.structure)}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">Curta (60 chars)</Badge>
                        <p className="text-sm text-gray-700 line-clamp-2">{copy.short}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">Média (160 chars)</Badge>
                        <p className="text-sm text-gray-700 line-clamp-3">{copy.medium}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">Longa (300 chars)</Badge>
                        <p className="text-sm text-gray-700 line-clamp-4">{copy.long}</p>
                      </div>
                      <div className="pt-2 border-t">
                        <Badge variant="secondary" className="text-xs mb-1">CTA</Badge>
                        <p className="text-sm font-medium text-purple-700">{copy.cta}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="detailed" className="space-y-6">
              {selectedCopy < copies.length && (
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-xl font-semibold">Copy {selectedCopy + 1}</h3>
                    <Badge className={getStructureColor(copies[selectedCopy].structure)}>
                      {copies[selectedCopy].structure}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {getStructureDescription(copies[selectedCopy].structure)}
                    </span>
                  </div>

                  <Tabs value={selectedLength} onValueChange={(value) => setSelectedLength(value as any)}>
                    <TabsList>
                      <TabsTrigger value="short">Curta</TabsTrigger>
                      <TabsTrigger value="medium">Média</TabsTrigger>
                      <TabsTrigger value="long">Longa</TabsTrigger>
                    </TabsList>

                    <TabsContent value="short" className="space-y-4">
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <Badge variant="outline">Até 60 caracteres - Ideal para títulos</Badge>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => copyToClipboard(copies[selectedCopy].short)}
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                Copiar
                              </Button>
                            </div>
                          </div>
                          <p className="text-lg leading-relaxed">{copies[selectedCopy].short}</p>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="medium" className="space-y-4">
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <Badge variant="outline">Até 160 caracteres - Ideal para posts</Badge>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => copyToClipboard(copies[selectedCopy].medium)}
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                Copiar
                              </Button>
                            </div>
                          </div>
                          <p className="text-lg leading-relaxed">{copies[selectedCopy].medium}</p>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="long" className="space-y-4">
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <Badge variant="outline">Até 300 caracteres - Ideal para WhatsApp</Badge>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => copyToClipboard(copies[selectedCopy].long)}
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                Copiar
                              </Button>
                            </div>
                          </div>
                          <p className="text-lg leading-relaxed">{copies[selectedCopy].long}</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>

                  {/* CTA */}
                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge className="bg-purple-100 text-purple-800">Chamada para Ação</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => copyToClipboard(copies[selectedCopy].cta)}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copiar CTA
                        </Button>
                      </div>
                      <p className="text-lg font-medium text-purple-700">{copies[selectedCopy].cta}</p>
                    </CardContent>
                  </Card>

                  {/* Prévia Completa */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Prévia da Mensagem Completa</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-500">
                        <p className="whitespace-pre-line text-gray-800 leading-relaxed">
                          {copies[selectedCopy][selectedLength]}
                          {"\n\n"}
                          {copies[selectedCopy].cta}
                          {"\n\n"}
                          ---
                          {"\n"}
                          Mensagem gerada automaticamente pelo CopyLinka IA.
                          {"\n"}
                          Você recebeu esta mensagem porque demonstrou interesse em nossos produtos.
                          {"\n"}
                          Para não receber mais mensagens, responda 'PARAR'.
                        </p>
                      </div>
                      <div className="flex gap-3 mt-6">
                        <Button 
                          onClick={() => sendToWhatsApp(copies[selectedCopy], selectedLength)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Enviar pelo WhatsApp
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => copyToClipboard(`${copies[selectedCopy][selectedLength]}\n\n${copies[selectedCopy].cta}\n\n---\nMensagem gerada automaticamente pelo CopyLinka IA.\nVocê recebeu esta mensagem porque demonstrou interesse em nossos produtos.\nPara não receber mais mensagens, responda 'PARAR'.`)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copiar Mensagem Completa
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}