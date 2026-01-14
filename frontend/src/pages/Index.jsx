import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-background">
      {/* ================= HERO SECTION ================= */}
      <section className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6">
            Build Your{" "}
            <span className="text-primary">Career</span>{" "}
            With Confidence
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Connect with top employers, explore verified opportunities,
            and build your career with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/register"
              className="
                px-8 py-4
                bg-primary text-white
                font-semibold text-lg
                rounded-xl
                shadow-lg
                hover:bg-primary/90
                hover:shadow-xl
                transition-all
              "
              style={{ backgroundColor: '#1d4ed8', color: '#ffffff' }}
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="
                px-8 py-4
                border-2 border-primary
                text-primary
                font-semibold text-lg
                rounded-xl
                hover:bg-primary
                hover:text-white
                transition-all
              "
              style={{ borderColor: '#1d4ed8', color: '#1d4ed8' }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="bg-muted/30 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Choose <span className="text-primary">JobPortal</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-card rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition">
              <div
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#e6f0ff', border: '2px solid #1d4ed8' }}
              >
                <svg style={{ color: '#1d4ed8' }} className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Thousands of Jobs</h3>
              <p className="text-muted-foreground">
                Explore a wide range of verified job listings from trusted companies.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition">
              <div
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#e6f0ff', border: '2px solid #1d4ed8' }}
              >
                <svg style={{ color: '#1d4ed8' }} className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quick Apply</h3>
              <p className="text-muted-foreground">
                Apply to jobs in seconds and track your applications easily.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition">
              <div
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#e6f0ff', border: '2px solid #1d4ed8' }}
              >
                <svg style={{ color: '#1d4ed8' }} className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Favorites</h3>
              <p className="text-muted-foreground">
                Bookmark jobs and return to them anytime with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-muted-foreground">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
