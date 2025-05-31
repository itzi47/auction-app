import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Upload, Plus, X, DollarSign, Calendar, 
  Tag, FileText, Image as ImageIcon, CheckCircle, Clock
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Breadcrumb from '../components/ui/Breadcrumb';

interface AuctionFormData {
  title: string;
  description: string;
  category: string;
  startPrice: string;
  reservePrice: string;
  duration: string;
  images: File[];
  condition: string;
  shippingCost: string;
  paymentMethods: string[];
}

const CreateAuctionPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AuctionFormData>({
    title: '',
    description: '',
    category: '',
    startPrice: '',
    reservePrice: '',
    duration: '7',
    images: [],
    condition: '',
    shippingCost: '',
    paymentMethods: []
  });

  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Electronics', 'Art & Collectibles', 'Watches & Jewelry', 
    'Musical Instruments', 'Automotive', 'Fashion', 'Home & Garden',
    'Sports & Recreation', 'Books & Media', 'Antiques'
  ];

  const conditions = [
    'New', 'Like New', 'Excellent', 'Very Good', 'Good', 'Fair', 'Poor'
  ];

  const durations = [
    { value: '1', label: '1 Day' },
    { value: '3', label: '3 Days' },
    { value: '5', label: '5 Days' },
    { value: '7', label: '7 Days' },
    { value: '10', label: '10 Days' },
    { value: '14', label: '14 Days' }
  ];

  const steps = [
    { number: 1, title: 'Basic Info', icon: FileText },
    { number: 2, title: 'Images', icon: ImageIcon },
    { number: 3, title: 'Pricing', icon: DollarSign },
    { number: 4, title: 'Details', icon: Tag },
    { number: 5, title: 'Preview', icon: CheckCircle }
  ];

  const breadcrumbItems = [
    { label: 'Browse', href: '/' },
    { label: 'Create Auction', isActive: true }
  ];

  const handleInputChange = (field: keyof AuctionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newImages = Array.from(files).slice(0, 8 - formData.images.length);
    setFormData(prev => ({ 
      ...prev, 
      images: [...prev.images, ...newImages] 
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.category) newErrors.category = 'Category is required';
        break;
      case 2:
        if (formData.images.length === 0) newErrors.images = 'At least one image is required';
        break;
      case 3:
        if (!formData.startPrice) newErrors.startPrice = 'Starting price is required';
        if (parseFloat(formData.startPrice) <= 0) newErrors.startPrice = 'Starting price must be greater than 0';
        break;
      case 4:
        if (!formData.condition) newErrors.condition = 'Condition is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    try {
      // In a real app, this would submit to the API
      console.log('Submitting auction:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to success page or auction detail
      navigate('/auction-created-success');
    } catch (error) {
      console.error('Error creating auction:', error);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;
        
        return (
          <React.Fragment key={step.number}>
            <div className={`
              flex flex-col items-center relative
              ${isActive ? 'text-primary-600' : isCompleted ? 'text-success-600' : 'text-secondary-400'}
            `}>
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                ${isActive 
                  ? 'border-primary-600 bg-primary-50 shadow-lg transform scale-110' 
                  : isCompleted 
                    ? 'border-success-600 bg-success-50' 
                    : 'border-secondary-300 bg-white'
                }
              `}>
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-success-600" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </div>
              <span className={`
                mt-2 text-sm font-medium transition-colors
                ${isActive ? 'text-primary-600' : isCompleted ? 'text-success-600' : 'text-secondary-500'}
              `}>
                {step.title}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`
                w-16 h-1 mx-4 rounded-full transition-colors duration-300
                ${currentStep > step.number ? 'bg-success-200' : 'bg-secondary-200'}
              `} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  const renderStep1 = () => (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center">
        <FileText className="w-6 h-6 mr-3 text-primary-600" />
        Tell us about your item
      </h2>
      
      <div className="space-y-6">
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="What are you selling?"
          error={errors.title}
          className="text-lg"
        />

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={`
              w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500
              ${errors.category ? 'border-accent-500' : 'border-secondary-300'}
            `}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-accent-600">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your item in detail..."
            rows={6}
            className={`
              w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none
              ${errors.description ? 'border-accent-500' : 'border-secondary-300'}
            `}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-accent-600">{errors.description}</p>
          )}
          <p className="mt-2 text-sm text-secondary-500">
            Include condition, age, brand, model, and any unique features
          </p>
        </div>
      </div>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center">
        <ImageIcon className="w-6 h-6 mr-3 text-primary-600" />
        Add photos of your item
      </h2>

      <div
        className={`
          border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
          ${dragActive ? 'border-primary-500 bg-primary-50' : 'border-secondary-300'}
          ${errors.images ? 'border-accent-500' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-secondary-900 mb-2">
          Drag & drop your images here
        </h3>
        <p className="text-secondary-600 mb-4">
          or click to browse (max 8 images, JPG/PNG only)
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files)}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button variant="outline" className="cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            Choose Files
          </Button>
        </label>
      </div>

      {errors.images && (
        <p className="mt-2 text-sm text-accent-600">{errors.images}</p>
      )}

      {formData.images.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-secondary-900 mb-4">
            Uploaded Images ({formData.images.length}/8)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-accent-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                {index === 0 && (
                  <span className="absolute bottom-1 left-1 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                    Main
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );

  const renderStep3 = () => (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center">
        <DollarSign className="w-6 h-6 mr-3 text-primary-600" />
        Set your pricing
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Starting Price"
          type="number"
          value={formData.startPrice}
          onChange={(e) => handleInputChange('startPrice', e.target.value)}
          placeholder="0.00"
          error={errors.startPrice}
          prefix="$"
        />

        <Input
          label="Reserve Price (Optional)"
          type="number"
          value={formData.reservePrice}
          onChange={(e) => handleInputChange('reservePrice', e.target.value)}
          placeholder="0.00"
          prefix="$"
          helperText="Minimum price you'll accept"
        />

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Auction Duration
          </label>
          <select
            value={formData.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {durations.map(duration => (
              <option key={duration.value} value={duration.value}>
                {duration.label}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Shipping Cost"
          type="number"
          value={formData.shippingCost}
          onChange={(e) => handleInputChange('shippingCost', e.target.value)}
          placeholder="0.00"
          prefix="$"
          helperText="Leave blank for local pickup only"
        />
      </div>

      <div className="mt-8 p-6 bg-primary-50 rounded-xl border border-primary-200">
        <h3 className="text-lg font-medium text-primary-900 mb-2 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Auction Timeline
        </h3>
        <p className="text-primary-700">
          Your auction will run for {durations.find(d => d.value === formData.duration)?.label.toLowerCase()} 
          starting immediately after approval.
        </p>
      </div>
    </Card>
  );

  const renderStep4 = () => (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center">
        <Tag className="w-6 h-6 mr-3 text-primary-600" />
        Item Details
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Condition
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {conditions.map(condition => (
              <button
                key={condition}
                type="button"
                onClick={() => handleInputChange('condition', condition)}
                className={`
                  p-3 border rounded-lg text-sm font-medium transition-all
                  ${formData.condition === condition
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-secondary-300 hover:border-secondary-400'
                  }
                `}
              >
                {condition}
              </button>
            ))}
          </div>
          {errors.condition && (
            <p className="mt-2 text-sm text-accent-600">{errors.condition}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-3">
            Payment Methods (Select all that apply)
          </label>
          <div className="space-y-2">
            {['PayPal', 'Credit Card', 'Bank Transfer', 'Cash on Pickup'].map(method => (
              <label key={method} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.paymentMethods.includes(method)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData(prev => ({
                        ...prev,
                        paymentMethods: [...prev.paymentMethods, method]
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        paymentMethods: prev.paymentMethods.filter(m => m !== method)
                      }));
                    }
                  }}
                  className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                />
                <span className="text-secondary-700">{method}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );

  const renderStep5 = () => (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center">
        <CheckCircle className="w-6 h-6 mr-3 text-primary-600" />
        Review Your Auction
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Auction Preview</h3>
          <div className="border border-secondary-200 rounded-xl overflow-hidden">
            {formData.images[0] && (
              <img
                src={URL.createObjectURL(formData.images[0])}
                alt="Main preview"
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded mb-2">
                {formData.category}
              </span>
              <h4 className="text-lg font-semibold text-secondary-900 mb-2">{formData.title}</h4>
              <p className="text-secondary-600 text-sm mb-3 line-clamp-2">{formData.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-secondary-900">
                  Starting at ${formData.startPrice}
                </span>
                <span className="text-sm text-secondary-500">
                  {durations.find(d => d.value === formData.duration)?.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-secondary-600">Starting Price:</span>
              <span className="font-medium">${formData.startPrice}</span>
            </div>
            {formData.reservePrice && (
              <div className="flex justify-between">
                <span className="text-secondary-600">Reserve Price:</span>
                <span className="font-medium">${formData.reservePrice}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-secondary-600">Duration:</span>
              <span className="font-medium">{durations.find(d => d.value === formData.duration)?.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-600">Condition:</span>
              <span className="font-medium">{formData.condition}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-600">Images:</span>
              <span className="font-medium">{formData.images.length}</span>
            </div>
            {formData.shippingCost && (
              <div className="flex justify-between">
                <span className="text-secondary-600">Shipping:</span>
                <span className="font-medium">${formData.shippingCost}</span>
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-success-50 rounded-lg border border-success-200">
            <h4 className="text-success-800 font-medium mb-2">Ready to Launch!</h4>
            <p className="text-success-700 text-sm">
              Your auction will be reviewed and go live within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Link to="/" className="inline-flex items-center text-secondary-600 hover:text-primary-600 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Auctions
        </Link>

        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary-900 mb-3">
            Create New Auction
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            List your item and reach thousands of collectors and enthusiasts
          </p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Current Step Content */}
        {renderCurrentStep()}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="text-sm text-secondary-500">
            Step {currentStep} of {steps.length}
          </div>

          {currentStep < 5 ? (
            <Button
              variant="primary"
              onClick={nextStep}
              className="flex items-center"
            >
              Next
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleSubmit}
              className="flex items-center"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Create Auction
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAuctionPage; 