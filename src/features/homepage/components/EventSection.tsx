import Link from "next/link";

const departments = [
  {
    name: "Teknik Elektro",
    description: "Ut vel tortor quis enim facilisis tempus nec ornare dolor.",
    href: "/event/teknik-elektro",
  },
  {
    name: "Teknik Informatika",
    description: "Ut vel tortor quis enim facilisis tempus nec ornare dolor.",
    href: "/event/teknik-informatika",
  },
  {
    name: "Sistem Informasi",
    description: "Ut vel tortor quis enim facilisis tempus nec ornare dolor.",
    href: "/event/sistem-informasi",
  },
  {
    name: "Teknik Komputer",
    description: "Ut vel tortor quis enim facilisis tempus nec ornare dolor.",
    href: "/event/teknik-komputer",
  },
  {
    name: "Teknik Biomedik",
    description: "Ut vel tortor quis enim facilisis tempus nec ornare dolor.",
    href: "/event/teknik-biomedik",
  },
  {
    name: "Teknologi Informasi",
    description: "Ut vel tortor quis enim facilisis tempus nec ornare dolor.",
    href: "/event/teknologi-informasi",
  },
];

export default function EventSection() {
  return (
    <section className="bg-[#F3F3F3] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h3 className="text-4xl font-extrabold uppercase text-[#1D4ED8] md:text-5xl">
          Departemen
        </h3>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((department) => (
            <article key={department.name}>
              <div className="relative h-56 w-full overflow-hidden bg-white">
                <img
                  src="/images/Event-Rektorat-Image.png"
                  alt={department.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-5 pb-1 pt-6">
                <p className="text-3xl font-bold text-[#1D4ED8] md:text-[34px]">
                  {department.name}
                </p>
                <p className="mt-3 text-xl leading-relaxed text-black/90 md:text-2xl">
                  {department.description}
                </p>
                <Link
                  href={department.href}
                  className="mt-4 inline-block text-sm font-medium uppercase text-black"
                >
                  Selengkapnya ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
