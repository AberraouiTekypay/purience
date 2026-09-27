import { Language } from "@/types";

export interface TranslationDictionary {
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  searchPrompt: string;
  searchDestination: string;
  searchCategory: string;
  searchDate: string;
  searchButton: string;
  exploreAll: string;
  worthTravellingFor: string;
  nearYou: string;
  thisWeekend: string;
  puriencePicks: string;
  unexpectedMarrakech: string;
  eatDifferently: string;
  makeSomething: string;
  outside: string;
  afterDark: string;
  slowDown: string;
  withSomeoneSpecial: string;
  trendingDestinations: string;
  saveToWishlist: string;
  saved: string;
  shareExperience: string;
  checkAvailability: string;
  bookExperience: string;
  instantConfirmation: string;
  whyYoullLoveIt: string;
  theExperience: string;
  whatYoullDo: string;
  whoYoullMeet: string;
  whatsIncluded: string;
  whatsNotIncluded: string;
  meetingPoint: string;
  cancellation: string;
  reviews: string;
  similarExperiences: string;
  anEM300Company: string;
  rightsReserved: string;
  filterAll: string;
  viewDetails: string;
  perPerson: string;
  hours: string;
  from: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    tagline: "PURE + EXPERIENCE",
    heroHeadline: "Find something worth experiencing.",
    heroSubheadline: "Extraordinary things to do, wherever life takes you.",
    searchPrompt: "Where do you want to experience something?",
    searchDestination: "Any destination",
    searchCategory: "Any experience",
    searchDate: "When",
    searchButton: "Discover",
    exploreAll: "Explore All",
    worthTravellingFor: "Worth travelling for",
    nearYou: "Near you",
    thisWeekend: "This weekend",
    puriencePicks: "Purience Picks",
    unexpectedMarrakech: "Unexpected Marrakech",
    eatDifferently: "Eat differently",
    makeSomething: "Make something with your hands",
    outside: "Outside & Open Skies",
    afterDark: "After dark",
    slowDown: "Slow down & restore",
    withSomeoneSpecial: "With someone special",
    trendingDestinations: "Destinations to feel",
    saveToWishlist: "Save",
    saved: "Saved",
    shareExperience: "Share",
    checkAvailability: "Check availability",
    bookExperience: "Book this experience",
    instantConfirmation: "Instant confirmation",
    whyYoullLoveIt: "Why you'll love it",
    theExperience: "The experience",
    whatYoullDo: "What you'll do",
    whoYoullMeet: "Your host",
    whatsIncluded: "What's included",
    whatsNotIncluded: "What's not included",
    meetingPoint: "Meeting point",
    cancellation: "Flexible cancellation",
    reviews: "Verified reviews",
    similarExperiences: "You might also love",
    anEM300Company: "An EM300.co Company",
    rightsReserved: "All rights reserved.",
    filterAll: "All",
    viewDetails: "View experience",
    perPerson: "per person",
    hours: "hours",
    from: "from",
  },
  fr: {
    tagline: "PUR + EXPÉRIENCE",
    heroHeadline: "Trouvez ce qui vaut vraiment d'être vécu.",
    heroSubheadline: "Des moments extraordinaires, où que vos pas vous mènent.",
    searchPrompt: "Où souhaitez-vous vivre une expérience ?",
    searchDestination: "Toute destination",
    searchCategory: "Toute expérience",
    searchDate: "Quand",
    searchButton: "Découvrir",
    exploreAll: "Tout explorer",
    worthTravellingFor: "Vaut le voyage",
    nearYou: "Près de vous",
    thisWeekend: "Ce week-end",
    puriencePicks: "Sélection Purience",
    unexpectedMarrakech: "Marrakech Inattendue",
    eatDifferently: "Manger autrement",
    makeSomething: "Créer de ses mains",
    outside: "Grands espaces",
    afterDark: "À la tombée de la nuit",
    slowDown: "Ralentir & respirer",
    withSomeoneSpecial: "À deux",
    trendingDestinations: "Destinations inspirantes",
    saveToWishlist: "Enregistrer",
    saved: "Enregistré",
    shareExperience: "Partager",
    checkAvailability: "Vérifier la disponibilité",
    bookExperience: "Réserver cette expérience",
    instantConfirmation: "Confirmation instantanée",
    whyYoullLoveIt: "Pourquoi vous allez adorer",
    theExperience: "L'expérience",
    whatYoullDo: "Le déroulement",
    whoYoullMeet: "Votre hôte",
    whatsIncluded: "Ce qui est inclus",
    whatsNotIncluded: "Non inclus",
    meetingPoint: "Point de rendez-vous",
    cancellation: "Annulation flexible",
    reviews: "Avis vérifiés",
    similarExperiences: "Vous aimerez aussi",
    anEM300Company: "Une entreprise EM300.co",
    rightsReserved: "Tous droits réservés.",
    filterAll: "Tous",
    viewDetails: "Voir l'expérience",
    perPerson: "par personne",
    hours: "heures",
    from: "dès",
  },
  es: {
    tagline: "PURO + EXPERIENCIA",
    heroHeadline: "Encuentra algo que merezca la pena vivir.",
    heroSubheadline: "Momentos extraordinarios, dondequiera que la vida te lleve.",
    searchPrompt: "¿Dónde quieres vivir una experiencia?",
    searchDestination: "Cualquier destino",
    searchCategory: "Cualquier experiencia",
    searchDate: "Cuándo",
    searchButton: "Descubrir",
    exploreAll: "Explorar todo",
    worthTravellingFor: "Merece el viaje",
    nearYou: "Cerca de ti",
    thisWeekend: "Este fin de semana",
    puriencePicks: "Selección Purience",
    unexpectedMarrakech: "Marrakech Inesperado",
    eatDifferently: "Comer diferente",
    makeSomething: "Crear con las manos",
    outside: "Al aire libre",
    afterDark: "Al caer la noche",
    slowDown: "Calma y bienestar",
    withSomeoneSpecial: "En pareja",
    trendingDestinations: "Destinos inspiradores",
    saveToWishlist: "Guardar",
    saved: "Guardado",
    shareExperience: "Compartir",
    checkAvailability: "Ver disponibilidad",
    bookExperience: "Reservar experiencia",
    instantConfirmation: "Confirmación instantánea",
    whyYoullLoveIt: "Por qué te encantará",
    theExperience: "La experiencia",
    whatYoullDo: "Qué harás",
    whoYoullMeet: "Tu anfitrión",
    whatsIncluded: "Qué incluye",
    whatsNotIncluded: "No incluye",
    meetingPoint: "Punto de encuentro",
    cancellation: "Cancelación flexible",
    reviews: "Opiniones verificadas",
    similarExperiences: "También te gustará",
    anEM300Company: "Una empresa de EM300.co",
    rightsReserved: "Todos los derechos reservados.",
    filterAll: "Todos",
    viewDetails: "Ver experiencia",
    perPerson: "por persona",
    hours: "horas",
    from: "desde",
  },
  ar: {
    tagline: "نقاء + تجربة",
    heroHeadline: "اكتشف ما يستحق حقاً أن يُعاش.",
    heroSubheadline: "لحظات وتجارب استثنائية أينما تأخذك وجهتك.",
    searchPrompt: "أين تريد أن تخوض تجربتك القادمة؟",
    searchDestination: "جميع الوجهات",
    searchCategory: "جميع التجارب",
    searchDate: "التاريخ",
    searchButton: "اكتشف الآن",
    exploreAll: "استكشف الكل",
    worthTravellingFor: "تستحق السفر لأجلها",
    nearYou: "بالقرب منك",
    thisWeekend: "عطلة نهاية الأسبوع",
    puriencePicks: "مختارات بيورينس",
    unexpectedMarrakech: "مراكش غير المألوفة",
    eatDifferently: "تذوق بنكهة أصيلة",
    makeSomething: "اصنع بيديك مع الحرفيين",
    outside: "تحت سماء الطبيعة",
    afterDark: "تجارب المساء والليل",
    slowDown: "استرخاء وهدوء الروح",
    withSomeoneSpecial: "لشخصين وتجارب خاصة",
    trendingDestinations: "وجهات مميزة",
    saveToWishlist: "حفظ",
    saved: "محفوظ",
    shareExperience: "مشاركة",
    checkAvailability: "تحقق من التوفر",
    bookExperience: "احجز هذه التجربة",
    instantConfirmation: "تأكيد فوري",
    whyYoullLoveIt: "لماذا ستعشق هذه التجربة",
    theExperience: "تفاصيل التجربة",
    whatYoullDo: "ماذا ستفعل",
    whoYoullMeet: "المضيف المحلي",
    whatsIncluded: "ما تشتمل عليه",
    whatsNotIncluded: "ما لا تشتمل عليه",
    meetingPoint: "نقطة اللقاء",
    cancellation: "إلغاء مرن",
    reviews: "تقييمات موثقة",
    similarExperiences: "تجارب قد تنال إعجابك",
    anEM300Company: "إحدى شركات EM300.co",
    rightsReserved: "جميع الحقوق محفوظة.",
    filterAll: "الكل",
    viewDetails: "عرض التفاصيل",
    perPerson: "للشخص",
    hours: "ساعات",
    from: "ابتداءً من",
  },
};

export const SUPPORTED_LANGUAGES: Array<{ code: Language; label: string; nativeName: string; dir: 'ltr' | 'rtl' }> = [
  { code: 'en', label: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'fr', label: 'French', nativeName: 'Français', dir: 'ltr' },
  { code: 'es', label: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
];
