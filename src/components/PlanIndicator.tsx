"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Zap, Clock, CheckCircle } from "lucide-react";

export function PlanIndicator() {
  // Simular plano gratuito
  const isFreeTrial = true;
  const daysLeft = 12;
  const dailyUsage = 1; // produtos gerados hoje
  const dailyLimit = 3;

  return (
    <Card className="w-full max-w-2xl mx-auto mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isFreeTrial ? (
              <Clock className="w-5 h-5 text-purple-600" />
            ) : (
              <Crown className="w-5 h-5 text-yellow-600" />
            )}
            Plano Atual
          </div>
          <Badge variant={isFreeTrial ? "secondary" : "default"} className="bg-purple-100 text-purple-800">
            {isFreeTrial ? "Teste Gratuito" : "Premium"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isFreeTrial ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 font-medium">
                  ⏰ {daysLeft} dias restantes no teste gratuito
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Uso hoje: {dailyUsage}/{dailyLimit} produtos • Máximo 5 variações por produto
                </p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Versão Free - Powered by CopyLinka
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Até 3 produtos por dia
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Máximo 5 variações por produto
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Técnicas AIDA, PAS e Storytelling
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Envio seguro pelo WhatsApp
                </li>
              </ul>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Crown className="mr-2 h-4 w-4" />
              Upgrade para Premium
            </Button>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Premium: Acesso ilimitado • Geração avançada • WhatsApp Business API • Estatísticas
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Plano Premium Ativo
              </h4>
              <p className="text-sm text-yellow-700">
                Acesso ilimitado a todas as funcionalidades do CopyLinka!
              </p>
            </div>
            
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500" />
                Produtos ilimitados por dia
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500" />
                Até 10 variações por produto
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500" />
                Integração WhatsApp Business API
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500" />
                Painel com estatísticas avançadas
              </li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}