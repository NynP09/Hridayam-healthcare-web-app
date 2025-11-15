import React, { useRef, useEffect, useState } from 'react';
import { Pencil, Save, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

const ECGViewer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [annotations, setAnnotations] = useState<Array<{x: number, y: number, text: string}>>([]);
  const [aiPrediction, setAiPrediction] = useState({
    diagnosis: 'Mild Arrhythmia',
    confidence: 87,
    validated: false,
    override: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    const height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Draw grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.offsetWidth; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.offsetHeight);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.offsetHeight; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.offsetWidth, i);
      ctx.stroke();
    }

    // Draw sample ECG data
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const centerY = canvas.offsetHeight / 2;
    const amplitude = 60;
    
    for (let x = 0; x < canvas.offsetWidth; x += 2) {
      const time = x * 0.01;
      let ecgValue = 0;

      // Complex ECG pattern with arrhythmia
      const heartbeatCycle = time % 3;
      if (heartbeatCycle < 0.1) {
        ecgValue = 0.3 * Math.sin(heartbeatCycle * 31.4);
      } else if (heartbeatCycle < 0.35) {
        const qrsTime = (heartbeatCycle - 0.1) / 0.25;
        if (qrsTime < 0.2) ecgValue = -0.25 * Math.sin(qrsTime * 15.7);
        else if (qrsTime < 0.6) ecgValue = 1.2 * Math.sin((qrsTime - 0.2) * 7.85);
        else ecgValue = -0.5 * Math.sin((qrsTime - 0.6) * 12.56);
      } else if (heartbeatCycle < 0.7) {
        ecgValue = 0.4 * Math.sin((heartbeatCycle - 0.35) * 8.97);
      } else if (heartbeatCycle < 1.2) {
        // Irregular beat
        ecgValue = 0.1 * Math.sin((heartbeatCycle - 0.7) * 25.1) + 0.05 * Math.random();
      } else {
        ecgValue = 0.02 * (Math.random() - 0.5);
      }

      const y = centerY - ecgValue * amplitude;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw annotations
    annotations.forEach(annotation => {
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(annotation.x, annotation.y, 4, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.fillStyle = '#1f2937';
      ctx.font = '12px system-ui';
      ctx.fillText(annotation.text, annotation.x + 10, annotation.y - 10);
    });

    // Highlight problematic areas
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(200, 100, 150, 200);
    ctx.strokeRect(450, 120, 100, 160);
    ctx.setLineDash([]);

  }, [annotations]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isAnnotating) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const text = prompt('Enter annotation:');
    if (text) {
      setAnnotations(prev => [...prev, { x, y, text }]);
    }
  };

  const validatePrediction = (override: boolean = false) => {
    setAiPrediction(prev => ({
      ...prev,
      validated: true,
      override
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">ECG Signal Analysis</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsAnnotating(!isAnnotating)}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isAnnotating 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Pencil className="h-4 w-4 mr-1" />
            {isAnnotating ? 'Stop Annotating' : 'Annotate'}
          </button>
          <button
            onClick={() => setAnnotations([])}
            className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Clear
          </button>
        </div>
      </div>

      <div className="mb-6">
        <canvas
          ref={canvasRef}
          className="w-full h-80 border border-gray-300 rounded-lg cursor-crosshair"
          onClick={handleCanvasClick}
          style={{ height: '320px' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">AI Analysis Results</h4>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-blue-900">Predicted Diagnosis:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                aiPrediction.validated 
                  ? aiPrediction.override 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {aiPrediction.validated 
                  ? aiPrediction.override 
                    ? 'Overridden' 
                    : 'Validated'
                  : 'Pending Review'
                }
              </span>
            </div>
            <p className="text-blue-800 font-medium mb-2">{aiPrediction.diagnosis}</p>
            <div className="flex items-center mb-3">
              <span className="text-sm text-blue-700 mr-2">Confidence:</span>
              <div className="flex-1 bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${aiPrediction.confidence}%` }}
                />
              </div>
              <span className="text-sm text-blue-700 ml-2">{aiPrediction.confidence}%</span>
            </div>
            {!aiPrediction.validated && (
              <div className="flex space-x-2">
                <button
                  onClick={() => validatePrediction(false)}
                  className="flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Validate
                </button>
                <button
                  onClick={() => validatePrediction(true)}
                  className="flex items-center px-3 py-1 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Override
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Annotations ({annotations.length})</h4>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {annotations.length === 0 ? (
              <p className="text-gray-500 text-sm italic">No annotations added yet</p>
            ) : (
              annotations.map((annotation, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-md p-3">
                  <div className="flex items-start justify-between">
                    <span className="text-sm text-gray-900">{annotation.text}</span>
                    <span className="text-xs text-gray-500">
                      ({Math.round(annotation.x)}, {Math.round(annotation.y)})
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECGViewer;