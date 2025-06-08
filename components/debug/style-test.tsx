"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StyleTest() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">🧪 Test de Estilos</h2>

      {/* Test básico de Tailwind */}
      <div className="bg-blue-500 text-white p-4 rounded">✅ Tailwind básico funcionando</div>

      {/* Test de variables CSS */}
      <div className="bg-primary text-primary-foreground p-4 rounded">✅ Variables CSS funcionando</div>

      {/* Test de componentes shadcn */}
      <Card>
        <CardHeader>
          <CardTitle>✅ Componentes shadcn/ui</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Botón de prueba</Button>
        </CardContent>
      </Card>

      {/* Test de tema oscuro */}
      <div className="bg-background text-foreground border border-border p-4 rounded">
        ✅ Sistema de temas funcionando
      </div>
    </div>
  )
}
