const About = () => {
  return (
    <div className="bg-slate-50">
      
      {/* HERO SECTION */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            About <span className="text-indigo-600">GroceryPro</span>
          </h1>

          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            GroceryPro is a modern, technology-driven online grocery delivery
            platform designed to make everyday shopping simple, fast, and
            stress-free. We bring fresh groceries directly to your doorstep
            with just a few clicks.
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our Story
            </h2>

            <p className="text-slate-600 leading-relaxed mb-4">
              GroceryPro was built with one simple idea — grocery shopping
              should not be time-consuming or tiring. In today’s busy
              lifestyle, visiting markets, standing in long queues, and
              managing household essentials can be stressful.
            </p>

            <p className="text-slate-600 leading-relaxed">
              That’s why we created GroceryPro — a platform where users can
              easily browse products, select quantities in kg, liter, or
              pieces, and receive fresh groceries at their home with reliable
              delivery.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              What Makes Us Different?
            </h3>

            <ul className="space-y-3 text-slate-600">
              <li>✔ Unit-based pricing (kg / liter / piece)</li>
              <li>✔ Transparent and fair pricing</li>
              <li>✔ Clean, easy-to-use platform</li>
              <li>✔ Reliable delivery experience</li>
            </ul>
          </div>

        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-white border-t border-b">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10">
          
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Our Mission
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Our mission is to simplify grocery shopping by combining
              technology, quality products, and excellent customer service —
              helping families save time and focus on what truly matters.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Our Vision
            </h3>
            <p className="text-slate-600 leading-relaxed">
              We aim to become a trusted household name in online grocery
              delivery by continuously improving our platform, expanding
              product variety, and maintaining high standards of quality and
              reliability.
            </p>
          </div>

        </div>
      </section>

      {/* VALUES / FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          Why Choose GroceryPro?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white border rounded-xl p-6 text-center">
            <h4 className="font-semibold text-lg mb-2">
              Fresh Products
            </h4>
            <p className="text-slate-600 text-sm">
              Handpicked fresh fruits, vegetables, and daily essentials from
              trusted suppliers.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6 text-center">
            <h4 className="font-semibold text-lg mb-2">
              Flexible Quantities
            </h4>
            <p className="text-slate-600 text-sm">
              Buy exactly what you need — 1 kg, 2 liters, or individual
              pieces.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6 text-center">
            <h4 className="font-semibold text-lg mb-2">
              Fast Delivery
            </h4>
            <p className="text-slate-600 text-sm">
              Quick and reliable delivery designed to maintain freshness and
              convenience.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6 text-center">
            <h4 className="font-semibold text-lg mb-2">
              Customer Support
            </h4>
            <p className="text-slate-600 text-sm">
              Dedicated support team to help you with orders, queries, and
              feedback.
            </p>
          </div>

        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Built for Everyday Convenience
          </h2>
          <p className="text-indigo-100 max-w-2xl mx-auto">
            GroceryPro is more than just a grocery app — it’s your daily
            shopping partner, designed to make life easier, smarter, and
            faster.
          </p>
        </div>
      </section>

    </div>
  );
};

export default About;
