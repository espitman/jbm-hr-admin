export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate: (dateString: string | Date | null | undefined): string => {
        if (!dateString) return '-'
        
        const date = new Date(dateString)
        if (isNaN(date.getTime())) return '-'
        
        return new Intl.DateTimeFormat('fa-IR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }).format(date)
      },
      formatDateOnly: (dateString: string | Date | null | undefined): string => {
        if (!dateString) return '-'
        
        const date = new Date(dateString)
        if (isNaN(date.getTime())) return '-'
        
        return new Intl.DateTimeFormat('fa-IR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(date)
      }
    }
  }
}) 