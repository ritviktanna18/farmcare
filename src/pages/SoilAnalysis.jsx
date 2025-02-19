import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FlaskConical, Loader2, AlertCircle, 
  Leaf, Droplets, ThermometerSun, 
  Sprout, ArrowRight, ChevronDown,
  Dna, Microscope, Scale
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

const SoilForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    pH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicMatter: '',
    texture: '',
    moisture: '',
    conductivity: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some(value => value === '')) {
      toast.error('Please fill all fields');
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* pH Level */}
        <div>
          <label className="text-green-200 text-sm block mb-2">pH Level</label>
          <input
            type="number"
            name="pH"
            step="0.1"
            min="0"
            max="14"
            value={formData.pH}
            onChange={handleChange}
            placeholder="e.g., 6.5"
            className="w-full px-4 py-2 bg-green-900/40 rounded-lg border border-green-700 text-green-100 placeholder-green-500"
          />
        </div>

        {/* Nitrogen Content */}
        <div>
          <label className="text-green-200 text-sm block mb-2">Nitrogen Content (mg/kg)</label>
          <input
            type="number"
            name="nitrogen"
            value={formData.nitrogen}
            onChange={handleChange}
            placeholder="e.g., 140"
            className="w-full px-4 py-2 bg-green-900/40 rounded-lg border border-green-700 text-green-100 placeholder-green-500"
          />
        </div>

        {/* Phosphorus Content */}
        <div>
          <label className="text-green-200 text-sm block mb-2">Phosphorus Content (mg/kg)</label>
          <input
            type="number"
            name="phosphorus"
            value={formData.phosphorus}
            onChange={handleChange}
            placeholder="e.g., 22"
            className="w-full px-4 py-2 bg-green-900/40 rounded-lg border border-green-700 text-green-100 placeholder-green-500"
          />
        </div>

        {/* Potassium Content */}
        <div>
          <label className="text-green-200 text-sm block mb-2">Potassium Content (mg/kg)</label>
          <input
            type="number"
            name="potassium"
            value={formData.potassium}
            onChange={handleChange}
            placeholder="e.g., 180"
            className="w-full px-4 py-2 bg-green-900/40 rounded-lg border border-green-700 text-green-100 placeholder-green-500"
          />
        </div>

        {/* Organic Matter */}
        <div>
          <label className="text-green-200 text-sm block mb-2">Organic Matter (%)</label>
          <input
            type="number"
            name="organicMatter"
            step="0.1"
            value={formData.organicMatter}
            onChange={handleChange}
            placeholder="e.g., 3.2"
            className="w-full px-4 py-2 bg-green-900/40 rounded-lg border border-green-700 text-green-100 placeholder-green-500"
          />
        </div>

        {/* Soil Texture */}
        <div>
          <label className="text-green-200 text-sm block mb-2">Soil Texture</label>
          <select
            name="texture"
            value={formData.texture}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-green-900/40 rounded-lg border border-green-700 text-green-100"
          >
            <option value="">Select texture</option>
            <option value="Sandy">Sandy</option>
            <option value="Loamy">Loamy</option>
            <option value="Clay">Clay</option>
            <option value="Silt">Silt</option>
            <option value="Sandy Loam">Sandy Loam</option>
            <option value="Clay Loam">Clay Loam</option>
          </select>
        </div>

        {/* Moisture Content */}
        <div>
          <label className="text-green-200 text-sm block mb-2">Moisture Content (%)</label>
          <input
            type="number"
            name="moisture"
            step="0.1"
            value={formData.moisture}
            onChange={handleChange}
            placeholder="e.g., 25"
            className="w-full px-4 py-2 bg-green-900/40 rounded-lg border border-green-700 text-green-100 placeholder-green-500"
          />
        </div>

        {/* Electrical Conductivity */}
        <div>
          <label className="text-green-200 text-sm block mb-2">Electrical Conductivity (dS/m)</label>
          <input
            type="number"
            name="conductivity"
            step="0.1"
            value={formData.conductivity}
            onChange={handleChange}
            placeholder="e.g., 1.2"
            className="w-full px-4 py-2 bg-green-900/40 rounded-lg border border-green-700 text-green-100 placeholder-green-500"
          />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <FlaskConical className="w-5 h-5" />
              <span>Analyze Soil</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

const AnalysisResult = ({ data }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const SectionHeader = ({ icon: Icon, title, section }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-green-800/20 rounded-lg hover:bg-green-800/30 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5 text-green-400" />
        <span className="font-medium text-green-200">{title}</span>
      </div>
      <ChevronDown 
        className={`w-5 h-5 text-green-400 transition-transform ${
          expandedSection === section ? 'transform rotate-180' : ''
        }`}
      />
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Soil Health Score */}
      <div className="bg-green-900/40 p-6 rounded-lg ring-1 ring-green-800/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-green-300">Soil Health Score</h3>
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-green-300">{data.healthScore}/100</span>
          </div>
        </div>
        <p className="text-green-200">{data.summary}</p>
      </div>

      {/* Detailed Analysis */}
      <div className="space-y-4">
        {/* Nutrient Status */}
        <div>
          <SectionHeader 
            icon={Dna} 
            title="Nutrient Status" 
            section="nutrients" 
          />
          <AnimatePresence>
            {expandedSection === 'nutrients' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-4">
                  {data.nutrients.map((nutrient, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-green-200">{nutrient.name}</span>
                      <div className="flex items-center">
                        <div className="w-32 h-2 bg-green-900/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${nutrient.level}%` }}
                          />
                        </div>
                        <span className="ml-2 text-green-400">{nutrient.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Recommendations */}
        <div>
          <SectionHeader 
            icon={Microscope} 
            title="Recommendations" 
            section="recommendations" 
          />
          <AnimatePresence>
            {expandedSection === 'recommendations' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-4">
                  {data.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <ArrowRight className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-green-200">{rec}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Suitable Crops */}
        <div>
          <SectionHeader 
            icon={Sprout} 
            title="Suitable Crops" 
            section="crops" 
          />
          <AnimatePresence>
            {expandedSection === 'crops' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {data.suitableCrops.map((crop, index) => (
                      <div key={index} className="bg-green-800/20 p-3 rounded-lg text-center">
                        <p className="text-green-300">{crop}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const SoilAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeSoil = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const prompt = `Analyze these soil test results and provide detailed recommendations:
      pH: ${formData.pH}
      Nitrogen: ${formData.nitrogen} mg/kg
      Phosphorus: ${formData.phosphorus} mg/kg
      Potassium: ${formData.potassium} mg/kg
      Organic Matter: ${formData.organicMatter}%
      Texture: ${formData.texture}
      Moisture: ${formData.moisture}%
      Electrical Conductivity: ${formData.conductivity} dS/m

      Provide analysis in this JSON format:
      {
        "healthScore": "overall soil health score out of 100",
        "summary": "brief summary of soil health",
        "nutrients": [
          {
            "name": "nutrient name",
            "level": "percentage level",
            "status": "status description"
          }
        ],
        "recommendations": [
          "detailed recommendation 1",
          "detailed recommendation 2"
        ],
        "suitableCrops": [
          "crop name 1",
          "crop name 2"
        ]
      }`;

      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=AIzaSyD7Gv1Nefuo5TipsBrHYvjwuIaKkh2WbtY',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.4,
              topK: 32,
              topP: 1,
              maxOutputTokens: 2048
            }
          })
        }
      );

      if (!response.ok) throw new Error('Failed to analyze soil data');

      const data = await response.json();
      const analysisText = data.candidates[0]?.content?.parts[0]?.text || '';
      
      try {
        const jsonStart = analysisText.indexOf('{');
        const jsonEnd = analysisText.lastIndexOf('}') + 1;
        const analysisData = JSON.parse(analysisText.slice(jsonStart, jsonEnd));
        setAnalysisResult(analysisData);
        toast.success('Analysis complete!');
      } catch (parseError) {
        throw new Error('Failed to parse analysis results');
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors closeButton />
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-green-900/50 ring-1 ring-green-500/50"
            whileHover={{ scale: 1.05 }}
          >
            <FlaskConical className="w-8 h-8 text-green-400" />
          </motion.div>
          <h1 className="text-4xl font-bold text-green-300 mb-4">
            Soil Analysis
          </h1>
          <p className="text-xl text-green-400 max-w-2xl mx-auto">
            Enter your soil test results for detailed analysis and recommendations
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-900/40 rounded-lg p-6 ring-1 ring-green-800/50"
        >
          <SoilForm onSubmit={analyzeSoil} isLoading={isLoading} />
          
          {error && (
            <div className="mt-6 flex items-center justify-center">
              <div className="bg-red-900/20 text-red-400 px-4 py-3 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            </div>
          )}
        </motion.div>

        {/* Analysis Results */}
        {analysisResult && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <AnalysisResult data={analysisResult} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SoilAnalysis;
