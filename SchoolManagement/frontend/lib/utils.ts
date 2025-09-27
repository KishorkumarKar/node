export const categoryMenuList = [
  {
    id: 1,
    title: "Smart Phones",
    src: "/smart phone icon.png",
    href: "/shop/smart-phones",
  },
  {
    id: 2,
    title: "Tablets",
    src: "/tablet icon.png",
    href: "/shop/tablets",
  },
  {
    id: 3,
    title: "Mouses",
    src: "/mouse icon.png",
    href: "/shop/mouses",
  },
  {
    id: 4,
    title: "Cameras",
    src: "/camera icon.png",
    href: "/shop/cameras",
  },
  {
    id: 5,
    title: "Smart Watches",
    src: "/smart watch.png",
    href: "/shop/watches",
  },
  {
    id: 6,
    title: "Laptops",
    src: "/laptop icon.png",
    href: "/shop/laptops",
  },
  {
    id: 7,
    title: "PCs",
    src: "/pc icon.png",
    href: "/shop/computers",
  },
  {
    id: 8,
    title: "Printers",
    src: "/printers icon.png",
    href: "/shop/printers",
  },
  {
    id: 9,
    title: "Earbuds",
    src: "/ear buds icon.png",
    href: "/shop/earbuds",
  },
  {
    id: 10,
    title: "Head Phones",
    src: "/headphone icon.png",
    href: "/shop/headphones",
  },
];

export const incentives = [
  {
    name: "Free Shipping",
    description:
      "Our shipping is completely free and that is completely good for our customers.",
    imageSrc: "/shipping icon.png",
  },
  {
    name: "24/7 Customer Support",
    description:
      "Our support is working all day and night to answer any question you have.",
    imageSrc: "/support icon.png",
  },
  {
    name: "Fast Shopping Cart",
    description:
      "We have super fast shopping experience and you will enjoy it.",
    imageSrc: "/fast shopping icon.png",
  },
];

export const navigation = {
  sale: [
    { name: "Discounts", href: "#" },
    { name: "News", href: "#" },
    { name: "Register Discounts", href: "#" },
  ],
  about: [
    { name: "About Singitronic", href: "#" },
    { name: "Work With Us", href: "#" },
    { name: "Company Profile", href: "#" },
  ],
  buy: [
    { name: "Singitronic Loyalty Card", href: "#" },
    { name: "Terms Of Use", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Complaints", href: "#" },
    { name: "Partners", href: "#" },
  ],
  help: [
    { name: "Contact", href: "#" },
    { name: "How to Buy at Singitronic", href: "#" },
    { name: "FAQ", href: "#" },
  ],
};
let serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const apiLink = {
  teacher: {
    login: `${serverUrl}teacher/login`,
    forgotPassword: `${serverUrl}teacher/forgotpassword`,
    filter: `${serverUrl}teacher/filter`,
    base: `${serverUrl}teacher`,
    add: `${serverUrl}teacher`,
  },
  school: {
    add: `${serverUrl}school`,
    list: `${serverUrl}school`,
    filter: `${serverUrl}school/filter/`,
    getById: `${serverUrl}school/`,
    delete: `${serverUrl}school/`,
    update: `${serverUrl}school/`,
    massDelete: `${serverUrl}school/massDelete`,
  },
  classRoom: {
    add: `${serverUrl}class`,
    list: `${serverUrl}class`,
  },
};

export const isValidNameOrLastname = (input: string) => {
  // Simple name or lastname regex format check
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(input);
};

export const isValidEmailAddressFormat = (input: string) => {
  console.log("====", process.env.DATABASE_URL);
  // simple email address format check
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(input);
};

export const isValidCardNumber = (input: string) => {
  // Remove all non-digit characters
  const cleanedInput = input.replace(/[^0-9]/g, "");
  // test for credit card number between 13 and 19 characters
  const regex = /^\d{13,19}$/;
  return regex.test(cleanedInput);
};

export const isValidCreditCardExpirationDate = (input: string) => {
  // simple expiration date format check
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  return regex.test(input);
};

export const isValidCreditCardCVVOrCVC = (input: string) => {
  // simple CVV or CVC format check
  const regex = /^[0-9]{3,4}$/;
  return regex.test(input);
};

export function formDataToObject(formData: FormData) {
  /* const obj: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    const match = key.match(/^(\w+)\[(\w+)\]$/); // e.g. "address[city]"
    if (match) {
      const [, parent, child] = match;
      if (!obj[parent]) obj[parent] = {};
      obj[parent][child] = value;
    } else {
      obj[key] = value;
    }
  }

  return obj; */

  const output: any = {};

  for (const [key, value] of formData.entries()) {
    const parts = key.split(/\[|\]/).filter(Boolean); // e.g. subject[123][name] -> ["subject","123","name"]
    let current = output;

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;

      // Case 1: numeric index (like ID inside subject)
      if (!isNaN(Number(part))) {
        if (!Array.isArray(current)) {
          // If parent was not an array → make it one
          const parentKey = parts[index - 1];
          if (!current[parentKey]) current[parentKey] = [];
          current = current[parentKey];
        } else {
          current = current;
        }

        // Find or create object with _id
        let obj = current.find((item: any) => item._id === part);
        if (!obj) {
          obj = { _id: part };
          current.push(obj);
        }
        current = obj;
      } else {
        // Case 2: normal key
        if (isLast) {
          current[part] = value;
        } else {
          if (!current[part]) {
            // If next part is numeric → make this an array
            if (!isNaN(Number(parts[index + 1]))) {
              current[part] = [];
            } else {
              current[part] = {};
            }
          }
          current = current[part];
        }
      }
    });
  }

  // Cleanup helper: remove _id
  function stripIds(obj: any): any {
    if (Array.isArray(obj)) return obj.map(stripIds);
    if (typeof obj === "object" && obj !== null) {
      const { _id, ...rest } = obj;
      Object.keys(rest).forEach((k) => (rest[k] = stripIds(rest[k])));
      return rest;
    }
    return obj;
  }

  return stripIds(output);
}

export const subject = [
  { id: "math", text: "Math" },
  { id: "science", text: "Science" },
  { id: "history", text: "History" },
  { id: "drawing", text: "Drawing" },
  { id: "pT", text: "PT" },
];
export const classDays = [
  { id: "Monday", text: "Monday" },
  { id: "Tuesday", text: "Tuesday" },
  { id: "Wednesday", text: "Wednesday" },
  { id: "Thursday", text: "Thursday" },
  { id: "Friday", text: "Friday" },
  { id: "Saturday", text: "Saturday" },
  { id: "Sunday", text: "Sunday" },
];
