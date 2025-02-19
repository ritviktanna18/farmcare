import React, { useState, useRef, useEffect } from 'react';
import { Upload, Loader2, Leaf, AlertCircle, Flower2, Heart, Droplet, Sun, Camera, Volume2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import LanguageSelector from './LanguageSelector';
import Progress from "./Progress";

const translations = {
  en: {
    title: 'Plant Health Analysis',
    subtitle: 'Upload or capture a plant photo for detailed analysis',
    uploadButton: 'Upload',
    cameraButton: 'Camera',
    supportText: 'Supports JPG, PNG or JPEG (max 10MB)',
    analyzing: 'Analyzing your plant...',
    wait: 'This may take a few moments',
    resultsTitle: 'Analysis Results'
  },
  hi: {
    title: 'पादप स्वास्थ्य विश्लेषण',
    subtitle: 'विस्तृत विश्लेषण के लिए पौधे की फोटो अपलोड करें या कैप्चर करें',
    uploadButton: 'अपलोड',
    cameraButton: 'कैमरा',
    supportText: 'JPG, PNG या JPEG का समर्थन करता है (अधिकतम 10MB)',
    analyzing: 'आपके पौधे का विश्लेषण किया जा रहा है...',
    wait: 'इसमें कुछ समय लग सकता है',
    resultsTitle: 'विश्लेषण परिणाम'
  },
  te: {
    title: 'మొక్క ఆరోగ్య విశ్లేషణ',
    subtitle: 'వివరణాత్మక విశ్లేషణ కోసం మొక్క ఫోటోను అప్‌లోడ్ చేయండి లేదా క్యాప్చర్ చేయండి',
    uploadButton: 'అప్‌లోడ్',
    cameraButton: 'కెమెరా',
    supportText: 'JPG, PNG లేదా JPEG మద్దతు ఉంది (గరిష్టంగా 10MB)',
    analyzing: 'మీ మొక్కను విశ్లేషిస్తోంది...',
    wait: 'ఇది కొన్ని క్షణాలు పట్టవచ్చు',
    resultsTitle: 'విశ్లేషణ ఫలితాలు'
  }
};

const StreamingText = ({ text, isComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    if (!text) return;
    
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="prose prose-invert prose-green max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {isComplete ? text : displayedText}
      </ReactMarkdown>
    </div>
  );
};

const CameraComponent = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let stream = null;
    
    const startCamera = async () => {
      try {
        const constraints = {
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(err => {
              setError('Failed to start video stream');
            });
          };
        }
      } catch (err) {
        toast.error('Camera access failed');
        setError('Failed to access camera. Please ensure camera permissions are granted.');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0);

    canvas.toBlob(blob => {
      const file = new File([blob], 'plant-photo.jpg', { type: 'image/jpeg' });
      toast.success('Photo captured successfully!');
      onCapture(file);
    }, 'image/jpeg', 0.8);
  };

  return (
    <div className="relative h-full bg-black rounded-lg overflow-hidden">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        <button
          onClick={capturePhoto}
          className="bg-green-500 p-3 rounded-full text-white hover:bg-green-400 transition-colors shadow-lg"
        >
          <Camera className="w-6 h-6" />
        </button>
        <button
          onClick={() => {
            toast.info('Camera closed');
            onClose();
          }}
          className="bg-red-500 p-3 rounded-full text-white hover:bg-red-400 transition-colors shadow-lg"
        >
          <AlertCircle className="w-6 h-6" />
        </button>
      </div>
      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-900/80 text-red-200 p-4 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

const ResultSection = ({ section, index, selectedLanguage }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);

  const getVoiceForLanguage = (language) => {
    const voices = window.speechSynthesis.getVoices();
    
    switch(language) {
      case 'hi':
        return voices.find(voice => voice.lang === 'hi-IN') || 
               voices.find(voice => voice.lang.startsWith('hi')) ||
               voices[0];
      case 'te':
        return voices.find(voice => voice.lang === 'te-IN') ||
               voices.find(voice => voice.lang.startsWith('te')) ||
               voices[0];
      default:
        return voices.find(voice => voice.lang === 'en-US') ||
               voices.find(voice => voice.lang.startsWith('en')) ||
               voices[0];
    }
  };

  const formatTextForSpeech = (text) => {
    return text
      .replace(/[#\-*_]/g, '')
      .replace(/\n/g, '. ')
      .replace(/\s+/g, ' ')
      .replace(/:\s/g, ', ')
      .replace(/[[\]]/g, '')
      .replace(/\(.*?\)/g, '')
      .trim();
  };

  const speakText = () => {
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const cleanText = formatTextForSpeech(`${section.title}. ${section.content}`);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.voice = getVoiceForLanguage(selectedLanguage);
    
    utterance.onstart = () => {
      toast.success('Started reading');
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      toast.success('Finished reading');
      setIsSpeaking(false);
      speechRef.current = null;
    };

    utterance.onerror = (event) => {
      toast.error('Error reading text: ' + event.error);
      setIsSpeaking(false);
      speechRef.current = null;
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    setIsComplete(false);
    const timer = setTimeout(() => setIsComplete(true), 2000);
    return () => {
      clearTimeout(timer);
      if (speechRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [section.content]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-green-800/20 rounded-lg p-6 backdrop-blur-sm hover:bg-green-800/30 transition-all duration-300 ring-1 ring-green-700/30"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-900/50 mr-3">
            <section.icon className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-green-300">{section.title}</h3>
        </div>
        <button
          onClick={speakText}
          className={`p-2 rounded-full ${
            isSpeaking ? 'bg-green-500 text-white' : 'bg-green-900/50 text-green-400'
          } hover:bg-green-500 hover:text-white transition-colors`}
          aria-label={isSpeaking ? 'Stop speaking' : 'Read aloud'}
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
      <StreamingText text={section.content} isComplete={isComplete} />
    </motion.div>
  );
};

const LoadingOverlay = ({ progress }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-green-950/50 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className="bg-green-900/90 rounded-lg p-8 shadow-xl flex flex-col items-center max-w-md w-full mx-4"
    >
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-full border-4 border-green-400/20">
          <Loader2 className="w-16 h-16 text-green-400 animate-spin absolute inset-0" />
        </div>
      </div>
      <p className="mt-4 text-lg font-medium text-green-100">Analyzing your plant...</p>
      <p className="mt-2 text-sm text-green-400">This may take a few moments</p>
      <div className="w-full mt-6">
        <Progress value={progress} className="h-2" />
        <p className="text-center mt-2 text-sm text-green-400">{progress}%</p>
      </div>
    </motion.div>
  </motion.div>
);

const UploadZone = ({ onImageUpload, onCameraStart, selectedImage, dragActive, loading }) => {
  const fileInputRef = useRef(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="relative group"
    >
      <motion.div
        animate={{ scale: dragActive ? 1.02 : 1 }}
        className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
          dragActive ? 'ring-4 ring-green-400' : 'ring-2 ring-green-600/50'
        }`}
      >
        <div className="h-80">
          {selectedImage ? (
            <div className="relative h-full">
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                src={selectedImage}
                alt="Selected plant"
                className={`object-contain w-full h-full p-4 ${loading ? 'opacity-50' : ''}`}
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-green-950/30">
                  <Loader2 className="w-12 h-12 text-green-400 animate-spin" />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 rounded-lg hover:bg-green-500 transition-colors shadow-lg"
                  disabled={loading}
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Photo</span>
                </button>
                <button
                  onClick={() => {
                    toast.info('Opening camera...');
                    onCameraStart();
                  }}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 rounded-lg hover:bg-green-500 transition-colors shadow-lg"
                  disabled={loading}
                >
                  <Camera className="w-5 h-5" />
                  <span>Use Camera</span>
                </button>
              </div>
              <p className="text-sm text-green-400">Drop your image here or click to upload</p>
              <p className="text-xs text-green-500 mt-2">Supports JPG, PNG or JPEG (max 10MB)</p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onImageUpload}
          disabled={loading}
        />
      </motion.div>
    </motion.div>
  );
};

const PlantAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showCamera, setShowCamera] = useState(false);
  const [progress, setProgress] = useState(0);

  const formatAnalysisText = (text) => {
    try {
      const sections = text.split(/(?:\r?\n|\r)(?=\d+\.)/);
      return sections.map((section, index) => {
        const cleanSection = section.replace(/^\d+\.\s*/, '').trim();
        const sectionInfo = [
          { icon: Flower2, title: 'Plant Identification' },
          { icon: Heart, title: 'Health Status' },
          { icon: AlertCircle, title: 'Current Conditions' },
          { icon: Droplet, title: 'Care Recommendations' }
        ][index] || { icon: Sun, title: 'Additional Information' };
        return cleanSection ? { icon: sectionInfo.icon, title: sectionInfo.title, content: cleanSection } : null;
      }).filter(Boolean);
    } catch (error) {
      return [{ icon: Flower2, title: 'Analysis Result', content: text }];
    }
  };

  const analyzePlant = async (imageFile, language = selectedLanguage) => {
    if (!imageFile) {
      toast.error('Please select an image file');
      return;
    }

    setLoading(true);
    setError(null);
    setProgress(0);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          setProgress(20);
          toast.info('Processing image...');
          
          const base64Image = reader.result.split(',')[1];
          setProgress(40);
          
          const languagePrompt = language === 'en'
            ? 'Analyze this plant image and provide a detailed markdown response in English:'
            : language === 'hi'
              ? 'Analyze this plant image and provide a detailed markdown response in Hindi:'
              : 'Analyze this plant image and provide a detailed markdown response in Telugu:';

          toast.info('Analyzing plant...');
          setProgress(60);

          const response = await fetch(
            'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyD7Gv1Nefuo5TipsBrHYvjwuIaKkh2WbtY',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: {
                  role: "user",
                  parts: [
                    { text: `${languagePrompt}\n# Plant Identification\n- Common Name\n- Scientific Name\n- Family\n- Variety/Cultivar\n\n# Health Assessment\n- Overall Status\n- Confidence Level\n- Key Indicators\n\n# Visible Conditions\n- Leaf Appearance\n- Growth Pattern\n- Issues Detected\n- Notable Features\n\n# Care Guidelines\n## Light Requirements\n## Watering Needs\n## Environment\n- Temperature\n- Humidity\n- Soil Type\n\n## Additional Care\n- Fertilization\n- Pruning\n- Special Care\n\nIf problems detected:\n# Treatment Recommendations` },
                    { inlineData: { mimeType: imageFile.type, data: base64Image } }
                  ]
                },
                generationConfig: { temperature: 0.4, topK: 32, topP: 1, maxOutputTokens: 1024 }
              })
            }
          );

          if (!response.ok) throw new Error(await response.text());
          
          setProgress(80);
          toast.info('Generating analysis...');
          
          const responseData = await response.json();
          const textResponse = responseData.candidates[0]?.content?.parts[0]?.text || '';
          setAnalysis(formatAnalysisText(textResponse));
          
          setProgress(100);
          toast.success('Analysis complete!');
          
        } catch (err) {
          toast.error('Failed to analyze the image');
          setError('Failed to analyze the image. Please try again.');
        } finally {
          setLoading(false);
          setTimeout(() => setProgress(0), 1000);
        }
      };

      reader.onerror = () => {
        toast.error('Failed to read the image');
        setError('Failed to read the image file. Please try again.');
        setLoading(false);
      };

      reader.readAsDataURL(imageFile);
    } catch (err) {
      toast.error('An unexpected error occurred');
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleLanguageChange = async (newLanguage) => {
    setSelectedLanguage(newLanguage);
    if (selectedImage && analysis) {
      setLoading(true);
      try {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
        await analyzePlant(file, newLanguage);
      } catch (err) {
        toast.error('Failed to change language');
        setError('Failed to change language. Please try again.');
      }
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        setError('Please select a valid image file');
        return;
      }
      setSelectedImage(URL.createObjectURL(file));
      analyzePlant(file);
    }
  };

  const handleCameraCapture = (file) => {
    setSelectedImage(URL.createObjectURL(file));
    analyzePlant(file);
    setShowCamera(false);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(URL.createObjectURL(file));
      analyzePlant(file);
    } else {
      toast.error('Please select a valid image file');
      setError('Please select a valid image file');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <Toaster position="top-right" richColors closeButton />
      <AnimatePresence>
        {loading && <LoadingOverlay progress={progress} />}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div
            className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-green-900/50 ring-1 ring-green-500/50"
            whileHover={{ scale: 1.05 }}
          >
            <Flower2 className="w-12 h-12 text-green-400" />
          </motion.div>

          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-300 tracking-tight">
              {translations[selectedLanguage].title}
            </h1>
            <p className="text-xl text-green-400 max-w-2xl mx-auto">
              {translations[selectedLanguage].subtitle}
            </p>
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </motion.div>

        <motion.div
          className="bg-green-900/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl ring-1 ring-green-800/50"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {showCamera ? (
            <CameraComponent
              onCapture={handleCameraCapture}
              onClose={() => setShowCamera(false)}
            />
          ) : (
            <UploadZone
              onImageUpload={handleImageUpload}
              onCameraStart={() => setShowCamera(true)}
              selectedImage={selectedImage}
              dragActive={dragActive}
              loading={loading}
            />
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 flex items-center space-x-3 text-red-400 p-4 bg-red-900/20 rounded-lg"
            >
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}

          {analysis && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="mt-8"
            >
              <motion.div
                className="bg-green-800/30 rounded-xl p-6 shadow-lg ring-1 ring-green-700"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h2
                  className="text-2xl font-bold text-green-300 mb-6 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Leaf className="w-6 h-6 mr-2" />
                  {translations[selectedLanguage].resultsTitle}
                </motion.h2>
                <motion.div
                  className="grid gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                  {analysis.map((section, index) => (
                    <ResultSection 
                      key={index} 
                      section={section} 
                      index={index}
                      selectedLanguage={selectedLanguage}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlantAnalysis;
