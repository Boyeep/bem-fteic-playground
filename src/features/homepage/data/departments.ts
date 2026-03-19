export const defaultDepartmentImage = "/images/Event-Rektorat-Image.png";

export type DepartmentProgram = {
  name: string;
  description: string;
  href: string;
  imageSrc?: string;
  titleClassName?: string;
};

export type Department = {
  name: string;
  description: string;
  href: string;
  imageSrc?: string;
  titleClassName?: string;
  programs?: DepartmentProgram[];
};

export const departments: Department[] = [
  {
    name: "Teknik Elektro",
    description:
      "Departemen dengan dua program studi sarjana yang bisa ditelusuri langsung dari kartu ini.",
    href: "https://www.its.ac.id/telektro/id/departemen-teknik-elektro-its/",
    programs: [
      {
        name: "Teknik Elektro",
        description:
          "Program studi sarjana yang berfokus pada sistem tenaga, elektronika, dan kontrol.",
        href: "https://www.its.ac.id/telektro/id/akademik/program-studi-sarjana/",
      },
      {
        name: "Teknik Telekomunikasi",
        description:
          "Program studi sarjana yang berfokus pada jaringan, sinyal, dan komunikasi digital.",
        href: "https://www.its.ac.id/telektro/id/akademik/prodi-telekomunikasi/",
      },
    ],
  },
  {
    name: "Teknik Informatika",
    description:
      "Departemen dengan tiga program studi sarjana yang bisa ditelusuri melalui animasi flip kartu.",
    href: "https://www.its.ac.id/informatika/id/departemen-teknik-informatika/",
    titleClassName: "text-[1.85rem] md:text-[28px]",
    programs: [
      {
        name: "Teknik Informatika",
        description:
          "Program studi sarjana yang berfokus pada fondasi ilmu komputer, algoritma, dan pengembangan sistem.",
        href: "https://www.its.ac.id/informatika/id/akademik/program-studi/program-studi-s1/",
      },
      {
        name: "Rekayasa Perangkat Lunak",
        description:
          "Program studi sarjana yang berfokus pada analisis, desain, dan pengembangan perangkat lunak modern.",
        href: "https://www.its.ac.id/informatika/id/akademik/program-studi/program-studi-sarjana-s1-rekayasa-perangkat-lunak/",
      },
      {
        name: "Rekayasa Kecerdasan Artifisial",
        description:
          "Program studi sarjana yang berfokus pada machine learning, data cerdas, dan sistem berbasis AI.",
        href: "https://www.its.ac.id/informatika/id/akademik/program-studi/program-studi-sarjana-s1-rekayasa-kecerdasan-artifisial/",
      },
    ],
  },
  {
    name: "Sistem Informasi",
    description:
      "Departemen dengan dua program studi sarjana yang bisa dijelajahi lewat flip card.",
    href: "https://www.its.ac.id/si/",
    programs: [
      {
        name: "Sistem Informasi",
        description:
          "Program studi sarjana yang berfokus pada integrasi teknologi, proses bisnis, dan kebutuhan organisasi.",
        href: "https://www.its.ac.id/si/program-studi-s1/",
      },
      {
        name: "Inovasi Digital",
        description:
          "Program studi sarjana yang berfokus pada pengembangan produk digital, strategi inovasi, dan transformasi bisnis.",
        href: "https://www.its.ac.id/si/program-studi-inovasi-digital/",
      },
    ],
  },
  {
    name: "Teknik Komputer",
    description: "Ut vel tortor quis enim facilisis tempus nec ornare dolor.",
    href: "https://www.its.ac.id/komputer/id/departemen-teknik-komputer-its/",
  },
  {
    name: "Teknik Biomedik",
    description: "Ut vel tortor quis enim facilisis tempus nec ornare dolor.",
    href: "https://www.its.ac.id/tbiomedik/id/beranda/",
  },
  {
    name: "Teknologi Informasi",
    description: "Ut vel tortor quis enim facilisis tempus nec ornare dolor.",
    href: "https://www.its.ac.id/it/id/departemen-teknologi-informasi/",
    titleClassName: "text-[1.85rem] md:text-[28px]",
  },
];
