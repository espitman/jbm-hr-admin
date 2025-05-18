export default defineNuxtPlugin(() => {
  const toPersianDigits = (num: number): string => {
    const persianDigits: string[] = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    return num.toString().replace(/[0-9]/g, (w: string) => persianDigits[+w])
  }

  return {
    provide: {
      toPersianDigits
    }
  }
}) 