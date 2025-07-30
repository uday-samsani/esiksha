# eSaastra Academy - Physics Teaching Portfolio

A modern, responsive React-based portfolio website for Mr. Kiran Kumar's physics tutoring services. This application showcases teaching expertise, handles student enquiries, and provides a student dashboard for enrolled students.

## 🚀 Features

### For Visitors
- **Hero Section**: Eye-catching introduction with call-to-action for free trial
- **Enquiry Form**: Functional contact form for potential students
- **Sample Slides**: Interactive physics topic previews with detailed modals
- **Testimonials**: Student success stories and reviews
- **Pricing**: Transparent pricing for different course levels
- **About Section**: Tutor qualifications and experience
- **Contact Information**: Multiple contact methods including WhatsApp integration

### For Students
- **User Authentication**: Secure login/signup system using Firebase
- **Student Dashboard**: Personalized area for enrolled students
- **Course Materials**: Access to learning resources (placeholder)
- **Live Classes**: Schedule and join online sessions (placeholder)

### Technical Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Beautiful design with Tailwind CSS
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **SEO Optimized**: Meta tags and structured content
- **Performance**: Fast loading with Vite build system

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Authentication**: Firebase Auth
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### 1. Clone and Install Dependencies
```bash
# Install dependencies
npm install
```

### 2. Firebase Configuration
You need to set up Firebase for authentication to work:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Get your Firebase config from Project Settings
5. Update the `firebaseConfig` object in `src/App.jsx`:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### 3. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

## 🎨 Customization

### Colors and Branding
The application uses an orange color scheme. You can customize colors by modifying the Tailwind classes in the components.

### Content Updates
- **Tutor Information**: Update the About section in `src/App.jsx`
- **Contact Details**: Modify phone numbers and email addresses
- **Social Media Links**: Update Instagram and Facebook URLs
- **Pricing**: Adjust pricing in the pricing section
- **Testimonials**: Add or modify student testimonials

### Images
- Replace placeholder images with actual physics slides
- Update the logo URL in the Navbar component
- Add real student photos for testimonials

## 📱 Responsive Design

The application is fully responsive and includes:
- Mobile-first design approach
- Responsive navigation with hamburger menu
- Adaptive grid layouts
- Touch-friendly interactive elements

## 🔧 Configuration Options

### Environment Variables
Create a `.env` file for sensitive configuration:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Form Submission
The enquiry form currently simulates submission. To connect to a real backend:

1. Replace the `handleEnquirySubmit` function in the HomePage component
2. Add your backend API endpoint
3. Handle form validation and error states

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build and deploy: `npm run build && firebase deploy`

## 📞 Contact Information

- **WhatsApp**: +91 94907 63767
- **Email**: esaastra.academy@gmail.com
- **YouTube**: [eSaastra Channel](https://www.youtube.com/channel/UCG_Fc7ACJlob0CDWCViiNuQ)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with React and Tailwind CSS
- Icons from Lucide React
- Authentication powered by Firebase
- Deployed with Vite

---

**Mr. Kiran Kumar** - Physics Educator  
*M.Tech, M.Sc (Physics) | 7+ Years Teaching Experience* 