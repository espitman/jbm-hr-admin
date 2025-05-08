const requestKindValues = [
  'employment',
  'payroll_stamped',
  'salary_deduction',
  'introduction_letter',
  'good_conduct_letter',
  'confirmation_letter',
  'embassy_letter',
  'development_learning',
  'childbirth_gift',
  'marriage_gift',
  'travel_credit',
  'supplementary_insurance'
] as const

type RequestKind = typeof requestKindValues[number] | string

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
      case 'travel_credit':
        return 'اعتبار سفر'
      case 'supplementary_insurance':
        return 'بیمه تکمیلی'
      default:
        return kind
    }
  }

  const getRequestKinds = () => {
    return requestKindValues.map(value => ({
      value,
      label: getRequestTypeText(value)
    }))
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
            credit_amount: 'مقدار به تومان',
            insurance_card: 'کارت بیمه',
            insurance_invoice: 'فاکتور بیمه',
            insurance_receipt: 'رسید پرداخت بیمه',
            self: 'اطلاعات خود فرد',
            spouse: 'اطلاعات همسر',
            father: 'اطلاعات پدر',
            mother: 'اطلاعات مادر',
            child1: 'اطلاعات فرزند اول',
            child2: 'اطلاعات فرزند دوم',
            child3: 'اطلاعات فرزند سوم',
            child4: 'اطلاعات فرزند چهارم',
            child5: 'اطلاعات فرزند پنجم'
          }
          return titles[key] || key
        },
        getRequestKinds
      }
    }
  }
}) 