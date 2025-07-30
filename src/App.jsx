import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth';
import { Phone, Mail, MessageSquare, BookOpen, User, Award, Star, LogIn, LogOut, LayoutDashboard, X, Zap, ChevronsUp, ImageIcon, DollarSign, Info, HelpCircle } from 'lucide-react';

// --- Firebase Configuration ---
// Replace these with your actual Firebase config values
const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// --- Main App Component ---
export default function App() {
    // --- State Management ---
    const [page, setPage] = useState('home'); // 'home', 'login', 'dashboard'
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authService, setAuthService] = useState(null);

    // --- Firebase Initialization ---
    useEffect(() => {
        try {
            const app = initializeApp(firebaseConfig);
            const auth = getAuth(app);
            setAuthService(auth);

            // Listener for authentication state changes
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                if (currentUser) {
                    setPage('dashboard'); // Automatically go to dashboard if logged in
                } else {
                    setPage('home'); // Go to home if not logged in
                }
                setLoading(false);
            });

            // Cleanup subscription on unmount
            return () => unsubscribe();
        } catch (error) {
            console.error("Firebase initialization error:", error);
            setLoading(false);
        }
    }, []);

    // --- Authentication Handlers ---
    const handleSignOut = () => {
        if (authService) {
            signOut(authService)
                .then(() => {
                    setUser(null);
                    setPage('home');
                })
                .catch((error) => console.error('Sign out error:', error));
        }
    };

    // --- Render Logic ---
    if (loading) {
        return <div className="flex justify-center items-center h-screen bg-slate-900 text-white">Loading...</div>;
    }

    return (
        <div className="bg-orange-50 min-h-screen font-sans text-slate-800">
            <Navbar user={user} setPage={setPage} handleSignOut={handleSignOut} />
            <main>
                {page === 'home' && <HomePage setPage={setPage} />}
                {page === 'login' && <LoginPage authService={authService} setPage={setPage} />}
                {page === 'dashboard' && user && <DashboardPage user={user} />}
            </main>
            <Footer />
        </div>
    );
}

// --- Components ---

const Navbar = ({ user, setPage, handleSignOut }) => (
    <header className="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
            <div className="cursor-pointer" onClick={() => setPage(user ? 'dashboard' : 'home')}>
                {/* Replace this src with the actual URL of your hosted logo image */}
                <img src="https://i.imgur.com/Kq8E3rR.png" alt="eSaastra Academy Logo" className="h-12" />
            </div>
            <div className="hidden md:flex items-center space-x-6">
                <a href="#about" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition font-semibold">
                    <Info className="text-orange-500" size={18}/> About
                </a>
                <a href="#slides" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition font-semibold">
                    <ImageIcon className="text-orange-500" size={18}/> Slides
                </a>
                <a href="#testimonials" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition font-semibold">
                    <Star className="text-orange-500" size={18}/> Testimonials
                </a>
                <a href="#pricing" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition font-semibold">
                    <DollarSign className="text-orange-500" size={18}/> Pricing
                </a>
                 <a href="#enquiry" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition font-semibold">
                    <HelpCircle className="text-orange-500" size={18}/> Enquiry
                </a>
                <a href="#contact" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition font-semibold">
                    <Mail className="text-orange-500" size={18}/> Contact
                </a>
            </div>
            <div>
                {user ? (
                    <div className="flex items-center gap-4">
                         <button onClick={() => setPage('dashboard')} className="flex items-center gap-2 font-semibold text-gray-600 hover:text-orange-600 transition">
                            <LayoutDashboard size={20} /> Dashboard
                        </button>
                        <button onClick={handleSignOut} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition font-semibold">
                            <LogOut size={20} /> Sign Out
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setPage('login')} className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition font-semibold">
                        <LogIn size={20} /> Sign In
                    </button>
                )}
            </div>
        </nav>
    </header>
);

// --- Social Media Icons ---
const YouTubeIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.1 9.5 5.32v2.14H6v4.14h3.5v9.34h4V11.6h3.83l.67-4.14z" />
  </svg>
);


const HomePage = ({ setPage }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlide, setSelectedSlide] = useState(null);
    const [enquiryForm, setEnquiryForm] = useState({
        name: '',
        class: '',
        contactNumber: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    // --- Data for Slides and Testimonials ---
    const slides = [
        { 
            id: 1, 
            src: "https://placehold.co/600x400/ea580c/ffffff?text=Kinematics+101", 
            alt: "Kinematics 101",
            content: "Kinematics is the branch of classical mechanics that describes the motion of points, bodies (objects), and systems of bodies (groups of objects) without considering the forces that cause them to move.\n\nKey Concepts:\n• Displacement & Distance\n• Velocity & Speed (Average and Instantaneous)\n• Acceleration\n• Equations of Motion (for constant acceleration)"
        },
        { 
            id: 2, 
            src: "https://placehold.co/600x400/ea580c/ffffff?text=Newton's+Laws", 
            alt: "Newton's Laws",
            content: "Newton's laws of motion are three basic laws of classical mechanics that describe the relationship between the motion of an object and the forces acting on it.\n\nKey Concepts:\n• First Law: Inertia\n• Second Law: F = ma\n• Third Law: Action-Reaction Pairs"
        },
        { 
            id: 3, 
            src: "https://placehold.co/600x400/ea580c/ffffff?text=Thermodynamics", 
            alt: "Thermodynamics",
            content: "Thermodynamics is the branch of physics that deals with heat, work, and temperature, and their relation to energy, radiation, and physical properties of matter.\n\nKey Concepts:\n• Zeroth, First, Second, and Third Laws of Thermodynamics\n• Enthalpy & Entropy\n• Heat Engines"
        },
        { 
            id: 4, 
            src: "https://placehold.co/600x400/ea580c/ffffff?text=Electromagnetism", 
            alt: "Electromagnetism",
            content: "Electromagnetism is a branch of physics involving the study of the electromagnetic force, a type of physical interaction that occurs between electrically charged particles.\n\nKey Concepts:\n• Electric Fields & Magnetic Fields\n• Maxwell's Equations\n• Electromagnetic Waves"
        },
    ];

    const testimonials = [
        { id: 1, name: "Aarav Sharma", quote: "Mr. Kiran's teaching method is phenomenal. He breaks down complex topics into simple, understandable concepts. My grades improved significantly!" },
        { id: 2, name: "Priya Patel", quote: "The personalized attention and targeted practice problems made all the difference for my IB Physics exam. Highly recommended!" },
        { id: 3, name: "Rohan Das", quote: "I used to find physics intimidating, but the classes made it fun and engaging. The free trial was the best decision I made." },
    ];

    const openModal = (slide) => {
        setSelectedSlide(slide);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSlide(null);
    };

    const handleEnquirySubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            // Simulate form submission (replace with actual backend call)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Here you would typically send the data to your backend
            console.log('Enquiry submitted:', enquiryForm);
            
            setSubmitMessage('Thank you! Your enquiry has been submitted successfully. We will contact you soon.');
            setEnquiryForm({ name: '', class: '', contactNumber: '' });
            
            // Clear success message after 5 seconds
            setTimeout(() => setSubmitMessage(''), 5000);
        } catch (error) {
            setSubmitMessage('Sorry, there was an error submitting your enquiry. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEnquiryForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            {/* Hero Section */}
            <section className="text-center py-20 md:py-32 bg-gradient-to-b from-orange-100 to-orange-50">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900">Master AP, IB & GCSE Physics with an Expert Tutor</h1>
                    <p className="mt-4 text-lg md:text-xl text-slate-600">Personalized online classes to boost your confidence and grades.</p>
                    <a href="https://wa.me/919490763767" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 bg-green-500 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-green-600 transition duration-300 shadow-lg">
                        <MessageSquare /> Book a FREE Trial Class
                    </a>
                    <p className="mt-4 text-base font-semibold text-slate-600">Experience the quality of teaching firsthand. No commitment required.</p>
                </div>
            </section>

            {/* Enquiry Section */}
            <section id="enquiry" className="py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold">Want to get good grades in physics?</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Fill out this quick form and I'll get back to you to discuss your needs.</p>
                    
                    {submitMessage && (
                        <div className={`mt-4 p-4 rounded-lg max-w-lg mx-auto ${
                            submitMessage.includes('Thank you') 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                            {submitMessage}
                        </div>
                    )}
                    
                    <form className="mt-8 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md space-y-6" onSubmit={handleEnquirySubmit}>
                        <div>
                            <label htmlFor="name" className="text-left block text-sm font-bold text-gray-700 mb-2">Parent/Student Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name"
                                value={enquiryForm.name}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                                placeholder="Enter your full name" 
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="class" className="text-left block text-sm font-bold text-gray-700 mb-2">Class / Grade</label>
                            <input 
                                type="text" 
                                id="class" 
                                name="class"
                                value={enquiryForm.class}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                                placeholder="e.g., 11th Grade, A-Level Year 1" 
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="contactNumber" className="text-left block text-sm font-bold text-gray-700 mb-2">Contact / WhatsApp Number</label>
                            <input 
                                type="tel" 
                                id="contactNumber" 
                                name="contactNumber"
                                value={enquiryForm.contactNumber}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                                placeholder="Enter your phone number" 
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-orange-600 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-700 transition duration-300 shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                        </button>
                    </form>
                </div>
            </section>

            {/* Slides Section */}
            <section id="slides" className="py-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">Sample Physics Slides</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {slides.map(slide => (
                            <div key={slide.id} onClick={() => openModal(slide)} className="bg-slate-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer group">
                                <img src={slide.src} alt={slide.alt} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h4 className="text-white font-semibold text-lg">{slide.alt}</h4>
                                    <p className="text-orange-400 text-sm mt-1">Click to learn more</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">What My Students Say</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-lg">
                                <div className="flex justify-center mb-4 text-yellow-500">
                                    {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" />)}
                                </div>
                                <p className="text-slate-600 italic">"{testimonial.quote}"</p>
                                <p className="mt-4 font-bold text-orange-700">- {testimonial.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">Transparent Pricing</h2>
                    <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
                        {/* Pricing Card 1 */}
                        <div className="w-full sm:w-1/2 lg:w-1/2 p-4">
                            <div className="border-2 border-orange-200 rounded-lg p-8 h-full flex flex-col">
                                <div className="mb-4">
                                    <Zap className="text-orange-500 h-10 w-10 mx-auto" />
                                    <h3 className="text-2xl font-bold mt-2">Foundational Physics</h3>
                                </div>
                                <p className="text-4xl font-extrabold my-4">$50<span className="text-lg font-medium text-slate-500">/hour</span></p>
                                <ul className="text-slate-600 space-y-2 mb-6">
                                    <li>AP Physics 1 & 2</li>
                                    <li>IB Physics (SL)</li>
                                    <li>GCSE Physics</li>
                                </ul>
                                <a href="#contact" className="mt-auto bg-orange-500 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition">Get Started</a>
                            </div>
                        </div>
                        {/* Pricing Card 2 */}
                        <div className="w-full sm:w-1/2 lg:w-1/2 p-4">
                            <div className="border-2 border-orange-500 rounded-lg p-8 h-full flex flex-col ring-4 ring-orange-200">
                                <div className="mb-4">
                                    <ChevronsUp className="text-orange-600 h-10 w-10 mx-auto" />
                                    <h3 className="text-2xl font-bold mt-2">Advanced Physics</h3>
                                </div>
                                <p className="text-4xl font-extrabold my-4">$75<span className="text-lg font-medium text-slate-500">/hour</span></p>
                                <ul className="text-slate-600 space-y-2 mb-6">
                                    <li>AP Physics C (Calculus-Based)</li>
                                    <li>IB Physics (HL)</li>
                                    <li>University-Level Prep</li>
                                </ul>
                                <a href="#contact" className="mt-auto bg-orange-600 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-700 transition">Get Started</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">About Your Tutor</h2>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-start">
                        <div className="text-left bg-white p-8 rounded-lg shadow-md">
                            <h3 className="flex items-center gap-2 text-2xl font-bold text-orange-700 mb-4"><User />Mr. Kiran Kumar</h3>
                            <p className="text-lg text-slate-700">I am a dedicated and passionate physics educator committed to helping students excel in their academic journey.</p>
                        </div>
                        <div className="text-left bg-white p-8 rounded-lg shadow-md">
                            <h3 className="flex items-center gap-2 text-2xl font-bold text-orange-700 mb-4"><Award />Experience & Qualifications</h3>
                            <ul className="list-disc list-inside text-slate-700 space-y-2">
                                <li>M.Tech, M.Sc (Physics)</li>
                                <li>7+ years of teaching experience for various international boards.</li>
                                <li>Specialized in preparing students for AP, IB & GCSE examinations.</li>
                                <li>Proven track record of helping students achieve top scores.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="bg-orange-600 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold">Get In Touch</h2>
                    <p className="mt-4 text-lg text-orange-100 max-w-2xl mx-auto">Have questions? Ready to start learning? Contact me today!</p>
                    
                    <div className="mt-12 max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Column: Primary Contact */}
                        <div className="flex flex-col items-center md:items-start gap-6 text-lg">
                            <a href="https://wa.me/919490763767" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 transform hover:scale-105 transition-transform">
                                <div className="bg-green-500 p-3 rounded-full shadow-md"><MessageSquare className="text-white"/></div>
                                <div className="text-left">
                                    <div className="font-bold">WhatsApp</div>
                                    <div className="text-base text-orange-200">+91 94907 63767</div>
                                </div>
                            </a>
                            <a href="tel:+919490763767" className="flex items-center gap-4 transform hover:scale-105 transition-transform">
                                <div className="bg-blue-500 p-3 rounded-full shadow-md"><Phone className="text-white"/></div>
                                <div className="text-left">
                                    <div className="font-bold">Call</div>
                                    <div className="text-base text-orange-200">+91 94907 63767</div>
                                </div>
                            </a>
                            <a href="mailto:esaastra.academy@gmail.com" className="flex items-center gap-4 transform hover:scale-105 transition-transform">
                                <div className="bg-slate-700 p-3 rounded-full shadow-md"><Mail className="text-white"/></div>
                                <div className="text-left">
                                    <div className="font-bold">Email</div>
                                    <div className="text-base text-orange-200">esaastra.academy@gmail.com</div>
                                </div>
                            </a>
                        </div>

                        {/* Right Column: Social Media */}
                        <div className="md:border-l border-orange-500/50 md:pl-12">
                            <h3 className="text-2xl font-semibold text-orange-100 mb-6">Follow Me</h3>
                            <div className="flex justify-center md:justify-start items-center gap-x-8">
                                {/* Highlighted YouTube Channel */}
                                <a href="https://www.youtube.com/channel/UCG_Fc7ACJlob0CDWCViiNuQ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-red-600 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-red-700 transition duration-300 shadow-lg">
                                    <YouTubeIcon className="w-7 h-7" />
                                    <span>eSaastra</span>
                                </a>
                                
                                {/* Other Social Icons */}
                                <a href="https://www.instagram.com/your-id" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-200 transition" aria-label="Instagram">
                                    <InstagramIcon className="w-9 h-9" />
                                </a>
                                 <a href="https://www.facebook.com/your-id" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-200 transition" aria-label="Facebook">
                                    <FacebookIcon className="w-9 h-9" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {isModalOpen && <Modal slide={selectedSlide} onClose={closeModal} />}
        </>
    );
};

const Modal = ({ slide, onClose }) => {
    if (!slide) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full relative transform transition-all duration-300 scale-95 animate-fade-in-up"
                onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition"
                >
                    <X size={28} />
                </button>
                <h3 className="text-3xl font-bold text-orange-700 mb-4">{slide.alt}</h3>
                <div className="text-slate-700 whitespace-pre-line text-lg max-h-[60vh] overflow-y-auto pr-4 modal-content">
                    {slide.content}
                </div>
                 <button
                    onClick={onClose}
                    className="mt-6 bg-orange-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-orange-700 transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
};


const LoginPage = ({ authService, setPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!authService) {
            setError('Authentication service not available. Please check Firebase configuration.');
            return;
        }

        if (isSignUp) {
            // Handle Sign Up
            createUserWithEmailAndPassword(authService, email, password)
                .then(userCredential => {
                    // Signed up, onAuthStateChanged will handle redirect
                })
                .catch(err => setError(err.message));
        } else {
            // Handle Sign In
            signInWithEmailAndPassword(authService, email, password)
                .then(userCredential => {
                    // Signed in, onAuthStateChanged will handle redirect
                })
                .catch(err => setError(err.message));
        }
    };

    return (
        <div className="flex justify-center items-center py-20">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">{isSignUp ? 'Create an Account' : 'Student Sign In'}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="text-sm font-bold text-gray-600 block">Email</label>
                        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500" required />
                    </div>
                    <div>
                        <label htmlFor="password"className="text-sm font-bold text-gray-600 block">Password</label>
                        <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500" required />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-md transition">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>
                <div className="text-center">
                    <button onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-orange-600 hover:underline">
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const DashboardPage = ({ user }) => (
    <div className="container mx-auto px-6 py-16">
        <div className="bg-white p-8 rounded-lg">
            <h1 className="text-4xl font-bold">Welcome to Your Dashboard</h1>
            <p className="text-lg text-slate-600 mt-2">Logged in as: {user.email}</p>
            <div className="mt-12 grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="flex items-center gap-2 text-2xl font-bold text-orange-700 mb-4"><BookOpen /> Your Materials</h3>
                    <p className="text-slate-700">Your personalized course materials, notes, and practice problems will appear here.</p>
                    <button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition font-semibold">Access Content</button>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="flex items-center gap-2 text-2xl font-bold text-orange-700 mb-4"><LayoutDashboard /> Live Classes</h3>
                    <p className="text-slate-700">Find the schedule and links to join your live online classes here.</p>
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition font-semibold">Join Live Class</button>
                </div>
            </div>
        </div>
    </div>
);

const Footer = () => (
    <footer className="bg-slate-900 text-white py-6">
        <div className="container mx-auto px-6 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} eSaastra Academy. All Rights Reserved.</p>
        </div>
    </footer>
); 