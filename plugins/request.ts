type RequestKind = 
  | 'employment'
  | 'payroll_stamped'
  | 'salary_deduction'
  | 'introduction_letter'
  | 'good_conduct_letter'
  | 'confirmation_letter'
  | 'embassy_letter'
  | 'development_learning'
  | 'childbirth_gift'
  | 'marriage_gift'
  | string

type RequestStatus = 
  | 'pending'
  | 'reviewed'
  | 'accepted'
  | 'rejected'
  | string

export default defineNuxtPlugin(() => {
  const getRequestTypeText = (kind: RequestKind): string => {
    switch (kind) {
      case 'employment':
        return 'اشتغال به کار'
      case 'payroll_stamped':
        return 'فیش حقوقی مهر شده'
      case 'salary_deduction':
        return 'کسر از حقوق'
      case 'introduction_letter':
        return 'معرفی نامه'
      case 'good_conduct_letter':
        return 'نامه حسن انجام کار'
      case 'confirmation_letter':
        return 'نامه تاییدیه'
      case 'embassy_letter':
        return 'نامه سفارت'
      case 'development_learning':
        return 'توسعه و یادگیری'
      case 'childbirth_gift':
        return 'هدیه تولد فرزند'
      case 'marriage_gift':
        return 'هدیه ازدواج'
      default:
        return kind
    }
  }

  const getStatusClass = (status: RequestStatus): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'reviewed':
        return 'bg-blue-100 text-blue-800'
      case 'accepted':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: RequestStatus): string => {
    switch (status) {
      case 'pending':
        return 'در انتظار بررسی'
      case 'reviewed':
        return 'بررسی شده'
      case 'accepted':
        return 'تایید شده'
      case 'rejected':
        return 'رد شده'
      default:
        return status
    }
  }

  return {
    provide: {
      request: {
        getRequestTypeText,
        getStatusClass,
        getStatusText,
        getDocumentTitle: (key: string): string => {
          const titles: Record<string, string> = {
            manager_approval: 'تایید مدیر',
            hrbp_approval: 'تایید HRBP',
            course_invoice: 'فاکتور دوره',
            payment_receipt: 'رسید پرداخت',
            travel_ticket: 'بلیط سفر',
            travel_invoice: 'فاکتور سفر',
            travel_receipt: 'رسید پرداخت سفر',
            provider: 'سرویس',
            credit_amount: 'مقدار به تومان'
          }
          return titles[key] || key
        }
      }
    }
  }
}) 