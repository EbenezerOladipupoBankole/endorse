import React, { useState, useRef } from 'react';
import { 
  CheckCircle, ArrowLeft, Save, Send, Download, 
  Type, Edit3, Calendar, User, ZoomIn, ZoomOut,
  Trash2, Copy, Move, AlignLeft, FileText, Plus,
  ChevronLeft, ChevronRight, Eye, Maximize2, X
} from 'lucide-react';

export default function DocumentEditorPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(3);
  const [zoom, setZoom] = useState(100);
  const [selectedField, setSelectedField] = useState(null);
  const [showFieldPanel, setShowFieldPanel] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const canvasRef = useRef(null);

  // Document fields state
  const [fields, setFields] = useState([
    {
      id: 1,
      type: 'signature',
      page: 1,
      x: 150,
      y: 600,
      width: 200,
      height: 60,
      assignedTo: 'Client',
      required: true,
      label: 'Client Signature'
    },
    {
      id: 2,
      type: 'date',
      page: 1,
      x: 150,
      y: 680,
      width: 150,
      height: 40,
      assignedTo: 'Client',
      required: true,
      label: 'Date Signed'
    },
    {
      id: 3,
      type: 'text',
      page: 1,
      x: 400,
      y: 600,
      width: 200,
      height: 40,
      assignedTo: 'Client',
      required: false,
      label: 'Printed Name'
    }
  ]);

  // Signers/Recipients
  const [signers, setSigners] = useState([
    { id: 1, name: 'Client', email: 'client@example.com', color: '#10b981' },
    { id: 2, name: 'Company Rep', email: 'rep@company.com', color: '#3b82f6' }
  ]);

  // Field types available
  const fieldTypes = [
    { type: 'signature', icon: <Edit3 className="w-5 h-5" />, label: 'Signature', color: 'emerald' },
    { type: 'text', icon: <Type className="w-5 h-5" />, label: 'Text Field', color: 'blue' },
    { type: 'date', icon: <Calendar className="w-5 h-5" />, label: 'Date', color: 'purple' },
    { type: 'name', icon: <User className="w-5 h-5" />, label: 'Name', color: 'amber' }
  ];

  // Drag and drop handlers
  const [draggedField, setDraggedField] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFieldDragStart = (fieldType) => {
    setDraggedField(fieldType);
    setIsDragging(true);
  };

  const handleCanvasDrop = (e) => {
    if (!draggedField) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newField = {
      id: Date.now(),
      type: draggedField.type,
      page: currentPage,
      x: x - 100,
      y: y - 30,
      width: draggedField.type === 'signature' ? 200 : draggedField.type === 'date' ? 150 : 200,
      height: draggedField.type === 'signature' ? 60 : 40,
      assignedTo: signers[0]?.name || 'Unassigned',
      required: true,
      label: draggedField.label
    };

    setFields([...fields, newField]);
    setDraggedField(null);
    setIsDragging(false);
  };

  const handleFieldMove = (fieldId, deltaX, deltaY) => {
    setFields(fields.map(field => 
      field.id === fieldId 
        ? { ...field, x: field.x + deltaX, y: field.y + deltaY }
        : field
    ));
  };

  const deleteField = (fieldId) => {
    setFields(fields.filter(f => f.id !== fieldId));
    setSelectedField(null);
  };

  const duplicateField = (field) => {
    const newField = {
      ...field,
      id: Date.now(),
      x: field.x + 20,
      y: field.y + 20
    };
    setFields([...fields, newField]);
  };

  // Get color for field type
  const getFieldColor = (type) => {
    const field = fieldTypes.find(f => f.type === type);
    return field?.color || 'slate';
  };

  // Top toolbar
  const Toolbar = () => (
    <div className="editor-toolbar">
      <div className="toolbar-section">
        <div className="toolbar-section">
          <button 
            className="toolbar-btn"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }));
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <div className="toolbar-separator"></div>
          <div className="toolbar-doc-title">
            <h1>Employment Contract - Sarah Johnson</h1>
            <p>Last saved 2 minutes ago</p>
          </div>
        </div>

        <div className="toolbar-section">
          <button 
            onClick={() => setPreviewMode(!previewMode)}
            className="toolbar-btn"
          >
            <Eye className="w-4 h-4" />
            <span>{previewMode ? 'Edit Mode' : 'Preview'}</span>
          </button>
          <button className="toolbar-btn secondary">
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
            <Send className="w-4 h-4" />
            <span>Send for Signature</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Field properties panel
  const FieldPropertiesPanel = () => {
    if (!selectedField) return null;

    const field = fields.find(f => f.id === selectedField);
    if (!field) return null;

    return (
      <div className="editor-panel editor-panel-right">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Field Properties</h3>
          <button 
            onClick={() => setSelectedField(null)}
            className="table-action-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Field Type</label>
            <div className="px-4 py-2 bg-slate-50 rounded-lg text-slate-900 capitalize">
              {field.type}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Label</label>
            <input
              type="text"
              value={field.label}
              onChange={(e) => setFields(fields.map(f => 
                f.id === field.id ? { ...f, label: e.target.value } : f
              ))}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Assigned To</label>
            <select
              value={field.assignedTo}
              onChange={(e) => setFields(fields.map(f => 
                f.id === field.id ? { ...f, assignedTo: e.target.value } : f
              ))}
              className="input-field"
            >
              {signers.map(signer => (
                <option key={signer.id} value={signer.name}>{signer.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => setFields(fields.map(f => 
                  f.id === field.id ? { ...f, required: e.target.checked } : f
                ))}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span className="text-sm font-medium text-slate-700">Required Field</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-2">
            <button
              onClick={() => duplicateField(field)}
              className="toolbar-btn w-full flex-center"
            >
              <Copy className="w-4 h-4" />
              <span>Duplicate Field</span>
            </button>
            <button
              onClick={() => deleteField(field.id)}
              className="toolbar-btn w-full flex-center bg-red-50 text-red-600 hover:bg-red-100"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Field</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Left sidebar with field types and signers
  const LeftSidebar = () => (
    <div className="editor-panel editor-panel-left">
      <div>
        <h3 className="panel-section-title">Field Types</h3>
        <div className="space-y-2">
          {fieldTypes.map((field, idx) => (
            <div
              key={idx}
              draggable
              onDragStart={() => handleFieldDragStart(field)}
              className={`field-type-card field-card-${field.color}`}
            >
              <div>
                {field.icon}
              </div>
              <span>{field.label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Drag and drop fields onto the document
        </p>
      </div>

      <div className="pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="panel-section-title">Signers</h3>
          <button className="table-action-btn">
            <Plus className="w-4 h-4 text-slate-600" />
          </button>
        </div>
        <div className="space-y-2">
          {signers.map((signer) => (
            <div
              key={signer.id}
              className="flex items-center space-x-3 px-4 py-3 bg-slate-50 rounded-lg"
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: signer.color }}
              ></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{signer.name}</p>
                <p className="text-xs text-slate-500 truncate">{signer.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200">
        <h3 className="panel-section-title">Fields on Page {currentPage}</h3>
        <div className="space-y-2">
          {fields.filter(f => f.page === currentPage).map((field) => (
            <button
              key={field.id}
              onClick={() => setSelectedField(field.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                selectedField === field.id
                  ? 'bg-emerald-50 border border-emerald-200'
                  : 'bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <span className="text-sm text-slate-900">{field.label}</span>
              <span className="text-xs text-slate-500 capitalize">{field.type}</span>
            </button>
          ))}
          {fields.filter(f => f.page === currentPage).length === 0 && (
            <p className="text-xs text-slate-500 text-center py-4">No fields on this page</p>
          )}
        </div>
      </div>
    </div>
  );

  // Document canvas
  const DocumentCanvas = () => {
    const DraggableField = ({ field }) => {
      const [isDraggingField, setIsDraggingField] = useState(false);
      const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

      const handleMouseDown = (e) => {
        setIsDraggingField(true);
        setDragStart({ x: e.clientX - field.x, y: e.clientY - field.y });
        setSelectedField(field.id);
      };

      const handleMouseMove = (e) => {
        if (!isDraggingField) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const newX = e.clientX - rect.left - dragStart.x + field.x;
        const newY = e.clientY - rect.top - dragStart.y + field.y;
        handleFieldMove(field.id, newX - field.x, newY - field.y);
      };

      const handleMouseUp = () => {
        setIsDraggingField(false);
      };

      React.useEffect(() => {
        if (isDraggingField) {
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
          return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
          };
        }
      }, [isDraggingField]);

      const signer = signers.find(s => s.name === field.assignedTo);
      const borderColor = signer?.color || '#94a3b8';

      return (
        <div
          onMouseDown={handleMouseDown}
          style={{
            position: 'absolute',
            left: `${field.x}px`,
            top: `${field.y}px`,
            width: `${field.width}px`,
            height: `${field.height}px`,
            border: `2px ${selectedField === field.id ? 'solid' : 'dashed'} ${borderColor}`,
            backgroundColor: selectedField === field.id ? `${borderColor}20` : `${borderColor}10`,
            cursor: previewMode ? 'default' : 'move',
            pointerEvents: previewMode ? 'none' : 'auto'
          }}>
          <div className="draggable-field-content">
            <p style={{ color: borderColor }}>
              {field.label}
            </p>
            <p style={{ color: borderColor }}>
              {field.assignedTo}
            </p>
          </div>
          {selectedField === field.id && !previewMode && (
            <div className="draggable-field-actions">
              <button
                onClick={(e) => { e.stopPropagation(); duplicateField(field); }}
                className="field-action-btn"
                title="Duplicate"
              >
                <Copy className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); deleteField(field.id); }}
                className="field-action-btn delete"
                title="Delete"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="document-canvas-wrapper">
        <div className="document-page-container">
          {/* Page controls */}
          <div className="toolbar-section justify-between mb-4">
            <div className="toolbar-section">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="toolbar-btn p-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium text-slate-700">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="toolbar-btn p-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="toolbar-section">
              <button
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                className="toolbar-btn p-2"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium text-slate-700 min-w-[60px] text-center">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(150, zoom + 10))}
                className="toolbar-btn p-2"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button className="toolbar-btn p-2">
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Document canvas */}
          <div
            ref={canvasRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleCanvasDrop}
            className="document-page"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              width: '816px',
              height: '1056px', // US Letter size
              position: 'relative'
            }}
          >
            {/* Simulated PDF content */}
            <div className="document-page-content">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg"></div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Employment Agreement</h2>
                  <p className="text-sm text-slate-600">Effective Date: November 29, 2024</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <p className="font-semibold">This Employment Agreement ("Agreement") is entered into as of the date above between:</p>
                
                <div className="pl-4">
                  <p><strong>Employer:</strong> TechCorp Industries Inc.</p>
                  <p><strong>Employee:</strong> Sarah Johnson</p>
                </div>

                <p className="font-semibold mt-6">1. Position and Duties</p>
                <p>The Employee is hired as a Senior Software Engineer and will perform duties as assigned by the Employer.</p>

                <p className="font-semibold mt-6">2. Compensation</p>
                <p>The Employee will receive an annual salary of $120,000, payable in accordance with the Employer's standard payroll practices.</p>

                <p className="font-semibold mt-6">3. Benefits</p>
                <p>The Employee is eligible for the company's standard benefits package including health insurance, 401(k) matching, and three weeks of paid vacation annually.</p>

                <p className="font-semibold mt-6">4. Signatures</p>
                <p>By signing below, both parties agree to the terms and conditions outlined in this Agreement.</p>
              </div>
            </div>

            {/* Render fields for current page */}
            {!previewMode && fields
              .filter(f => f.page === currentPage)
              .map(field => (
                <DraggableField key={field.id} field={field} />
              ))}

            {/* Drop zone indicator */}
            {isDragging && (
              <div className="absolute inset-0 bg-emerald-500 bg-opacity-5 border-2 border-dashed border-emerald-500 rounded-lg flex items-center justify-center">
                <p className="text-emerald-700 font-medium">Drop field here</p>
              </div>
            )}
          </div>

          {/* Page thumbnails */}
          <div className="flex justify-center space-x-4 mt-6">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`relative ${
                  currentPage === page
                    ? 'ring-2 ring-emerald-600'
                    : 'opacity-60 hover:opacity-100'
                } transition rounded`}
              >
                <div className="w-20 h-28 bg-white border border-slate-300 rounded shadow-sm flex items-center justify-center">
                  <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium">
                  {page}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="editor-layout">
      <Toolbar />
      <div className="editor-body">
        {!previewMode && <LeftSidebar />}
        <DocumentCanvas />
        {selectedField && !previewMode && <FieldPropertiesPanel />}
      </div>
    </div>
  );
}