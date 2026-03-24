import ScrollReveal from "./ScrollReveal";

const PartnersSection = () => (
  <section className="container py-20 border-t border-border">
    <ScrollReveal>
      <div className="bg-card p-10 rounded-3xl border border-border/50 shadow-sm overflow-hidden">
        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-12 text-center">
          Đối Tác & Khách Hàng Chiến Lược
        </h3>
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-30 hover:opacity-60 transition-opacity duration-700">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-24 bg-muted-foreground/20 rounded-lg hover:opacity-100 transition-all cursor-pointer duration-500" />
          ))}
        </div>
      </div>
    </ScrollReveal>
  </section>
);

export default PartnersSection;
