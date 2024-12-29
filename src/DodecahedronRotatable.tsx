import React, { useState, useEffect, useCallback } from 'react';

const DodecahedronDisplay = () => {
  const [rotation, setRotation] = useState({ x: 0.5, y: 0.5 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  // Constants for the dodecahedron
  const phi = (1 + Math.sqrt(5)) / 2;
  const scale = 100;
  const rotationSpeed = 0.001;

  // Base vertices of a regular dodecahedron
  const baseVertices = [
    [0,1/phi,phi],[0,-1/phi,phi],[0,-1/phi,-phi],[0,1/phi,-phi],
    [phi,0,1/phi],[-phi,0,1/phi],[-phi,0,-1/phi],[phi,0,-1/phi],
    [1/phi,phi,0],[-1/phi,phi,0],[-1/phi,-phi,0],[1/phi,-phi,0],
    [1,1,1],[-1,1,1],[-1,-1,1],[1,-1,1],
    [1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,-1]
  ].map(v => v.map(coord => coord * scale));

  // Faces defined by vertex indices
  const faces = [
    [0,1,15,4,12],
    [0,12,8,9,13],
    [0,13,5,14,1],
    [1,14,10,11,15],
    [2,3,17,7,16],
    [2,16,11,10,19],
    [2,19,6,18,3],
    [18,9,8,17,3],
    [15,11,16,7,4],
    [4,7,17,8,12],
    [13,9,18,6,5],
    [5,6,19,10,14]
  ];

  // 3D rotation matrices
  const rotateX = (point: any[], angle: number) => {
    const [x, y, z] = point;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      x,
      y * cos - z * sin,
      y * sin + z * cos
    ];
  };

  const rotateY = (point: number[] | [any, any, any], angle: number) => {
    const [x, y, z] = point;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      x * cos + z * sin,
      y,
      -x * sin + z * cos
    ];
  };

  // Project 3D to 2D with perspective
  const project = (point: any[]) => {
    const perspective = 400;
    const [x, y, z] = point;
    const factor = perspective / (perspective + z);
    return {
      x: x * factor + 200,
      y: y * factor + 200,
      z: z
    };
  };

  // Calculate rotated and projected vertices
  const getTransformedVertices = useCallback(() => {
    return baseVertices.map(vertex => {
      let rotated = rotateY(vertex, rotation.x * 4);
      rotated = rotateX(rotated, rotation.y * 4);
      return project(rotated);
    });
  }, [rotation]);

  // Mouse event handlers
  const handleMouseDown = (e: { clientX: any; clientY: any; }) => {
    setIsDragging(true);
    setLastPosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = useCallback((e: { clientX: number; clientY: number; }) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastPosition.x;
    const deltaY = e.clientY - lastPosition.y;

    setRotation(prev => ({
      x: prev.x + deltaX * rotationSpeed,
      y: prev.y + deltaY * rotationSpeed
    }));

    setLastPosition({
      x: e.clientX,
      y: e.clientY
    });
  }, [isDragging, lastPosition]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove]);

  // Calculate vertices and paths
  const transformedVertices = getTransformedVertices();
  const paths = faces.map(face => {
    const points = face.map(i => transformedVertices[i]);
    return {
      path: `M ${points[0].x} ${points[0].y} ` +
            points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') +
            ' Z',
      avgZ: points.reduce((sum, p) => sum + p.z, 0) / points.length
    };
  });

  // Sort faces by z-index for proper rendering
  paths.sort((a, b) => b.avgZ - a.avgZ);

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <svg 
          width="400" 
          height="400" 
          className="mx-auto cursor-move"
          onMouseDown={handleMouseDown}
        >
          {paths.map((path, i) => (
            <path
              key={i}
              d={path.path}
              fill="none"
              stroke="red"
              strokeWidth="2"
            />
          ))}
          {/* {
            transformedVertices.map((vertex,i) => (
              <text
              x={vertex.x + 10}
              y={vertex.y + 10}
              z={vertex.z + 10}
              fill="white"
              fontSize="12"
              className="select-none"
              >
                {i}
              </text>
            ))} */}
        </svg>
        <h1 className="text-white text-4xl mt-8">Interactive Dodecahedron</h1>
        <p className="text-white text-xl mt-4">Click and drag to rotate</p>
      </div>
    </div>
  );
};

export default DodecahedronDisplay;