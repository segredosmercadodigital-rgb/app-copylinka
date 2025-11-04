"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Image as ImageIcon, Wand2, Target, Palette } from "lucide-react";

const formSchema = z.object({
  productName: z.string().min(1, "Nome do produto é obrigatório"),
  description: z.string().min(20, "Descrição deve ter pelo menos 20 palavras"),
  productType: z.enum(["digital", "fisico"]),
  targetAudience: z.string().min(1, "Público-alvo é obrigatório"),
  tone: z.enum(["profissional", "persuasivo", "divertido", "inspirador", "emocional", "direto"]),
  variations: z.number().min(3).max(10),
});

type FormData = z.infer<typeof formSchema>;

interface ProductFormProps {
  onGenerate: (data: FormData & { image: File }) => void;
}

export function ProductForm({ onGenerate }: ProductFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variations: 5,
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormData) => {
    if (!image) {
      alert("Por favor, faça upload de uma imagem do produto");
      return;
    }
    onGenerate({ ...data, image });
  };

  const toneDescriptions = {
    profissional: "Formal, técnico e confiável",
    persuasivo: "Convincente com gatilhos de vendas",
    divertido: "Descontraído e bem-humorado",
    inspirador: "Motivacional e transformador",
    emocional: "Conecta com sentimentos profundos",
    direto: "Objetivo e sem rodeios"
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-white shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl flex items-center gap-3">
            <Wand2 className="w-6 h-6" />
            Gerador de Copy Inteligente
          </CardTitle>
          <p className="text-purple-100">
            Preencha os dados abaixo para gerar copies personalizadas com técnicas avançadas de copywriting
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nome do Produto */}
            <div className="space-y-2">
              <Label htmlFor="productName" className="text-lg font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-600" />
                Nome do Produto
              </Label>
              <Input 
                id="productName" 
                {...register("productName")} 
                placeholder="Ex: Difusor de Aromas Ozonteck"
                className="text-lg p-3"
              />
              {errors.productName && <p className="text-red-500 text-sm">{errors.productName.message}</p>}
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-lg font-semibold">
                Descrição Detalhada do Produto
              </Label>
              <Textarea 
                id="description" 
                {...register("description")} 
                rows={4}
                placeholder="Descreva seu produto de forma detalhada: benefícios, características, como funciona, problemas que resolve..."
                className="text-base p-3"
              />
              <p className="text-sm text-gray-500">
                Mínimo 20 palavras. Quanto mais detalhes, melhor será a copy gerada.
              </p>
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            {/* Upload de Imagem */}
            <div className="space-y-2">
              <Label htmlFor="image" className="text-lg font-semibold flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-600" />
                Imagem do Produto
              </Label>
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center bg-purple-50 hover:bg-purple-100 transition-colors">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="image" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-purple-400 mb-3" />
                  <p className="text-lg text-purple-600 font-medium">Clique para fazer upload da imagem</p>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG ou JPEG até 10MB</p>
                </label>
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="max-w-full h-64 object-cover rounded-lg mx-auto shadow-lg" />
                </div>
              )}
            </div>

            {/* Grid de Configurações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tipo de Produto */}
              <div className="space-y-2">
                <Label htmlFor="productType" className="text-lg font-semibold">
                  Tipo de Produto
                </Label>
                <Select onValueChange={(value) => setValue("productType", value as "digital" | "fisico")}>
                  <SelectTrigger className="text-base p-3">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="digital">
                      <div>
                        <div className="font-medium">Digital</div>
                        <div className="text-sm text-gray-500">E-books, cursos, apps, softwares</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="fisico">
                      <div>
                        <div className="font-medium">Físico</div>
                        <div className="text-sm text-gray-500">Produtos tangíveis, objetos</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.productType && <p className="text-red-500 text-sm">{errors.productType.message}</p>}
              </div>

              {/* Público-Alvo */}
              <div className="space-y-2">
                <Label htmlFor="targetAudience" className="text-lg font-semibold">
                  Público-Alvo
                </Label>
                <Input 
                  id="targetAudience" 
                  {...register("targetAudience")} 
                  placeholder="Ex: Pessoas que buscam relaxamento e qualidade de vida"
                  className="text-base p-3"
                />
                {errors.targetAudience && <p className="text-red-500 text-sm">{errors.targetAudience.message}</p>}
              </div>
            </div>

            {/* Tom de Voz */}
            <div className="space-y-2">
              <Label htmlFor="tone" className="text-lg font-semibold flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-600" />
                Tom de Voz
              </Label>
              <Select onValueChange={(value) => setValue("tone", value as any)}>
                <SelectTrigger className="text-base p-3">
                  <SelectValue placeholder="Selecione o tom desejado" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(toneDescriptions).map(([key, description]) => (
                    <SelectItem key={key} value={key}>
                      <div>
                        <div className="font-medium capitalize">{key}</div>
                        <div className="text-sm text-gray-500">{description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.tone && <p className="text-red-500 text-sm">{errors.tone.message}</p>}
            </div>

            {/* Quantidade de Variações */}
            <div className="space-y-2">
              <Label htmlFor="variations" className="text-lg font-semibold">
                Quantidade de Variações
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="variations"
                  type="number"
                  min={3}
                  max={10}
                  {...register("variations", { valueAsNumber: true })}
                  className="text-base p-3 w-24"
                />
                <span className="text-gray-600">
                  Cada variação usa uma técnica diferente (AIDA, PAS, Storytelling)
                </span>
              </div>
              {errors.variations && <p className="text-red-500 text-sm">{errors.variations.message}</p>}
            </div>

            {/* Botão de Geração */}
            <div className="pt-6">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Wand2 className="mr-3 h-5 w-5" />
                Gerar Copies Inteligentes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}