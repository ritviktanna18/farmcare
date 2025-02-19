import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Search, Loader2, Calendar, DollarSign, ArrowUpRight, ArrowDownRight, MapPin, Sun, Award, Store } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Toaster, toast } from 'sonner';

const PredictionCard = ({ title, current, predicted, change }) => (
  <div className="bg-green-900/40 p-4 rounded-lg ring-1 ring-green-800/50">
    <h3 className="text-green-300 text-sm mb-2">{title}</h3>
    <div className="flex items-end justify-between">
      <div>
        <p className="text-2xl font-bold text-green-100">₹{predicted}</p>
        <p className="text-sm text-green-400">Current: ₹{current}</p>
      </div>
      <div className={`flex items-center ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        <span className="text-sm font-medium">{Math.abs(change)}%</span>
      </div>
    </div>
  </div>
);

const FormSelect = ({ label, icon: Icon, name, value, onChange, options }) => (
  <div className="space-y-2">
    <label className="text-green-200 flex items-center text-sm">
      <Icon className="w-4 h-4 mr-1" />
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded-lg bg-green-800/20 border border-green-800/50 text-green-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
    >
      <option value="">{`Select ${label.toLowerCase()}`}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const VegetablePricePrediction = () => {
  const [formData, setFormData] = useState({
    vegetable: '', state: '', season: '', quality: '', marketType: '', duration: 3
  });
  const [isLoading, setIsLoading] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [formOptions, setFormOptions] = useState({
    vegetables: [], states: [], seasons: [], qualityGrades: [], marketTypes: []
  });

  const getInitialOptions = async () => {
    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=AIzaSyCyozrcOfWc4Q4fLCfJFtc5-lF5VTcwmOQ',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: `Generate lists of options for vegetable price prediction form in this JSON format:
              {
                "vegetables": ["list of common Indian vegetables"],
                "states": ["list of major agricultural Indian states"],
                "seasons": ["list of Indian agricultural seasons"],
                "qualityGrades": ["list of standard produce quality grades"],
                "marketTypes": ["list of different market types"]
              }` }] }],
            generationConfig: { temperature: 0.4, topK: 32, topP: 1, maxOutputTokens: 1024 }
          })
        }
      );
      if (!response.ok) throw new Error('Failed to get options');
      const data = await response.json();
      const responseText = data.candidates[0]?.content?.parts[0]?.text || '';
      const jsonStart = responseText.indexOf('{');
      const jsonEnd = responseText.lastIndexOf('}') + 1;
      const jsonStr = responseText.slice(jsonStart, jsonEnd);
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const getPredictions = async () => {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=AIzaSyD7Gv1Nefuo5TipsBrHYvjwuIaKkh2WbtY',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: `Generate price predictions for:
            - Vegetable: ${formData.vegetable}
            - State: ${formData.state}
            - Season: ${formData.season}
            - Quality: ${formData.quality}
            - Market: ${formData.marketType}
            - Duration: ${formData.duration} months
            
            Return in JSON format:
            {
              "currentPrice": 45,
              "predictions": [
                {
                  "month": "January 2024",
                  "price": 48,
                  "change": 6.67,
                  "supplyStatus": "Moderate",
                  "demandTrend": "Increasing"
                }
              ],
              "marketFactors": [
                {
                  "factor": "Weather Impact",
                  "description": "Expected rainfall pattern affects cultivation"
                }
              ],
              "recommendations": [
                {
                  "type": "Storage",
                  "suggestion": "Consider cold storage if price drops below threshold"
                }
              ],
              "qualityPremium": "10% premium for Grade A quality",
              "marketInsights": "Higher prices expected in retail markets",
              "regionalTrends": "Northern regions show stronger demand"
            }` }] }],
          generationConfig: { temperature: 0.4, topK: 32, topP: 1, maxOutputTokens: 2048 }
        })
      }
    );
    const data = await response.json();
    const responseText = data.candidates[0]?.content?.parts[0]?.text || '';
    const jsonStart = responseText.indexOf('{');
    const jsonEnd = responseText.lastIndexOf('}') + 1;
    return JSON.parse(responseText.slice(jsonStart, jsonEnd));
  };

  useEffect(() => {
    const loadOptions = async () => {
      const options = await getInitialOptions();
      if (options) setFormOptions(options);
    };
    loadOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vegetable || !formData.state || !formData.season || !formData.quality || !formData.marketType) {
      toast.error('Please fill all fields');
      return;
    }
    setIsLoading(true);
    try {
      const data = await getPredictions();
      setPredictionData(data);
      toast.success('Predictions generated successfully!');
    } catch (error) {
      toast.error('Failed to generate predictions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors closeButton />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-2 bg-green-900/50 rounded-full mb-4 ring-1 ring-green-800/50"
          >
            <TrendingUp className="w-6 h-6 text-green-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-green-100 mb-2">Vegetable Price Prediction</h1>
          <p className="text-green-200">Get AI-powered price predictions based on multiple factors</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-900/40 rounded-lg shadow-md p-6 mb-8 ring-1 ring-green-800/50"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormSelect
                label="Vegetable"
                icon={Store}
                name="vegetable"
                value={formData.vegetable}
                onChange={handleInputChange}
                options={formOptions.vegetables}
              />
              <FormSelect
                label="State"
                icon={MapPin}
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                options={formOptions.states}
              />
              <FormSelect
                label="Season"
                icon={Sun}
                name="season"
                value={formData.season}
                onChange={handleInputChange}
                options={formOptions.seasons}
              />
              <FormSelect
                label="Quality Grade"
                icon={Award}
                name="quality"
                value={formData.quality}
                onChange={handleInputChange}
                options={formOptions.qualityGrades}
              />
              <FormSelect
                label="Market Type"
                icon={Store}
                name="marketType"
                value={formData.marketType}
                onChange={handleInputChange}
                options={formOptions.marketTypes}
              />
              <FormSelect
                label="Duration"
                icon={Calendar}
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                options={[3, 6, 9]}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center space-x-2 bg-green-600 text-green-100 px-8 py-3 rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                <span>Generate Prediction</span>
              </button>
            </div>
          </form>
        </motion.div>

        {predictionData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              <PredictionCard
                title="Current Price (per kg)"
                current={predictionData.currentPrice}
                predicted={predictionData.currentPrice}
                change={0}
              />
              <PredictionCard
                title="Short-term Prediction"
                current={predictionData.currentPrice}
                predicted={predictionData.predictions[1]?.price}
                change={predictionData.predictions[1]?.change}
              />
              <PredictionCard
                title={`${formData.duration}-Month Prediction`}
                current={predictionData.currentPrice}
                predicted={predictionData.predictions[predictionData.predictions.length - 1]?.price}
                change={predictionData.predictions[predictionData.predictions.length - 1]?.change}
              />
            </div>

            <div className="bg-green-900/40 p-6 rounded-lg ring-1 ring-green-800/50">
              <h2 className="text-xl font-semibold text-green-200 mb-4">Price Trend Analysis</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictionData.predictions}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1F4B3F" />
                    <XAxis dataKey="month" stroke="#A7F3D0" style={{ fontSize: '0.875rem' }} />
                    <YAxis stroke="#A7F3D0" style={{ fontSize: '0.875rem' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#064E3B',
                        borderColor: '#065F46',
                        borderRadius: '0.5rem'
                      }}
                      labelStyle={{ color: '#A7F3D0' }}
                      itemStyle={{ color: '#34D399' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#34D399"
                      strokeWidth={2}
                      name="Price (₹)"
                      dot={{ fill: '#34D399', stroke: '#059669', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-900/40 p-6 rounded-lg ring-1 ring-green-800/50">
                <h2 className="text-xl font-semibold text-green-200 mb-4">Market Factors</h2>
                <ul className="space-y-2">
                  {predictionData.marketFactors.map((factor, index) => (
                    <li key={index} className="flex items-start text-green-100">
                      <span className="inline-block w-2 h-2 mt-2 mr-2 bg-green-500 rounded-full" />
                      <div>
                        <span className="font-medium">{factor.factor}:</span> {factor.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-900/40 p-6 rounded-lg ring-1 ring-green-800/50">
                <h2 className="text-xl font-semibold text-green-200 mb-4">Recommendations</h2>
                <ul className="space-y-2">
                  {predictionData.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start text-green-100">
                      <span className="inline-block w-2 h-2 mt-2 mr-2 bg-green-500 rounded-full" />
                      <div>
                      <span className="font-medium">{rec.type}:</span> {rec.suggestion}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-green-900/40 p-6 rounded-lg ring-1 ring-green-800/50">
              <h2 className="text-xl font-semibold text-green-200 mb-4">Additional Insights</h2>
              <p className="text-green-100 mb-4">
                <span className="font-medium">Quality Premium:</span> {predictionData.qualityPremium}
              </p>
              <p className="text-green-100 mb-4">
                <span className="font-medium">Market Insights:</span> {predictionData.marketInsights}
              </p>
              <p className="text-green-100">
                <span className="font-medium">Regional Trends:</span> {predictionData.regionalTrends}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VegetablePricePrediction;
