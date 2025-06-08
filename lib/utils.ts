import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina clases CSS de manera inteligente
 * @param inputs - Clases CSS a combinar
 * @returns String de clases CSS combinadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatea un número como precio en euros
 * @param precio - Precio a formatear
 * @returns Precio formateado
 */
export function formatearPrecio(precio: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(precio)
}

/**
 * Formatea un porcentaje de descuento
 * @param porcentaje - Porcentaje a formatear
 * @returns Porcentaje formateado con sufijo
 */
export function formatearDescuento(porcentaje: number): string {
  return `${Math.round(porcentaje)}% OFF`
}

/**
 * Debounce para optimizar búsquedas
 * @param func - Función a ejecutar
 * @param wait - Tiempo de espera en ms
 * @returns Función debounced
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout
  return ((...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }) as T
}

/**
 * Trunca un texto a una longitud específica
 * @param text - Texto a truncar
 * @param length - Longitud máxima
 * @returns Texto truncado
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}

/**
 * Valida si una URL es válida
 * @param url - URL a validar
 * @returns true si es válida
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
