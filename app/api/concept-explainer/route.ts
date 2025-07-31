import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query is required' },
        { status: 400 }
      );
    }

    // Try to use HuggingFace API first, then fallback to rule-based explanation
    let explanation;
    
    try {
      explanation = await generateAIExplanation(query);
    } catch (error) {
      console.log('AI API failed, using rule-based explanation');
      explanation = generateRuleBasedExplanation(query);
    }

    return NextResponse.json({
      success: true,
      explanation: explanation,
      query: query
    });
  } catch (error) {
    console.error('Concept explanation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate explanation' },
      { status: 500 }
    );
  }
}

async function generateAIExplanation(query: string): Promise<string> {
  // This would integrate with HuggingFace API or similar
  // For now, we'll use the rule-based system
  throw new Error('AI API not configured');
}

function generateRuleBasedExplanation(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  // Biology concepts
  if (lowerQuery.includes('photosynthesis')) {
    return `**Photosynthesis: The Process of Life**

Photosynthesis is one of the most important biological processes on Earth. Here's a comprehensive breakdown:

**What is it?**
Photosynthesis is the process by which plants, algae, and some bacteria convert light energy (usually from the sun) into chemical energy stored in glucose.

**The Simple Equation:**
6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂

**Key Components:**
• **Chloroplasts**: The tiny factories in plant cells where photosynthesis happens
• **Chlorophyll**: The green pigment that captures sunlight
• **Stomata**: Tiny pores in leaves that allow gas exchange

**Two Main Stages:**

1. **Light-Dependent Reactions (Photo)**
   - Occur in the thylakoids
   - Chlorophyll absorbs light energy
   - Water molecules are split, releasing oxygen
   - Energy is captured in molecules called ATP and NADPH

2. **Light-Independent Reactions (Synthesis)**
   - Also called the Calvin Cycle
   - Occurs in the stroma
   - CO₂ is converted into glucose using ATP and NADPH
   - This is where the actual "food" is made

**Why is it Important?**
• Produces oxygen that we breathe
• Forms the base of almost all food chains
• Removes CO₂ from the atmosphere
• Converts solar energy into chemical energy

**Fun Fact:** A single tree can produce enough oxygen for two people for an entire year!`;
  }

  // Physics concepts
  if (lowerQuery.includes('newton') && lowerQuery.includes('law')) {
    return `**Newton's Laws of Motion: The Foundation of Classical Mechanics**

Sir Isaac Newton's three laws of motion form the foundation of classical mechanics and describe the relationship between forces and motion.

**First Law (Law of Inertia)**
*"An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force."*

**Key Points:**
• Objects resist changes in their motion
• This resistance is called inertia
• More massive objects have more inertia

**Examples:**
- A book on a table stays there until you push it
- A hockey puck slides across ice until friction stops it
- You feel pushed back in your seat when a car accelerates

**Second Law (F = ma)**
*"The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass."*

**Mathematical Form:** F = ma
- F = Force (Newtons)
- m = mass (kilograms)
- a = acceleration (m/s²)

**What it means:**
• More force = more acceleration
• More mass = less acceleration (for same force)
• Force and acceleration are in the same direction

**Third Law (Action-Reaction)**
*"For every action, there is an equal and opposite reaction."*

**Key Points:**
• Forces always come in pairs
• The forces are equal in magnitude but opposite in direction
• They act on different objects

**Examples:**
- Walking: You push back on the ground, ground pushes forward on you
- Rocket propulsion: Hot gases pushed down, rocket pushed up
- Swimming: You push water back, water pushes you forward

**Real-World Applications:**
• Car safety systems (airbags, crumple zones)
• Sports techniques and equipment design
• Engineering and construction
• Space exploration and satellite orbits`;
  }

  // Chemistry concepts
  if (lowerQuery.includes('periodic table') || lowerQuery.includes('elements')) {
    return `**The Periodic Table: Nature's Organization System**

The periodic table is one of the most important tools in chemistry, organizing all known elements by their properties and atomic structure.

**What is it?**
The periodic table is a systematic arrangement of chemical elements, ordered by their atomic number (number of protons).

**Key Organization Principles:**
• **Periods (Rows)**: Elements with the same number of electron shells
• **Groups (Columns)**: Elements with similar chemical properties
• **Atomic Number**: Increases from left to right, top to bottom

**Important Groups:**
1. **Group 1 - Alkali Metals**: Highly reactive metals (Li, Na, K, etc.)
2. **Group 2 - Alkaline Earth Metals**: Reactive metals (Mg, Ca, etc.)
3. **Group 17 - Halogens**: Highly reactive non-metals (F, Cl, Br, I)
4. **Group 18 - Noble Gases**: Unreactive gases (He, Ne, Ar, etc.)

**Periodic Trends:**
• **Atomic Size**: Decreases across a period, increases down a group
• **Ionization Energy**: Increases across a period, decreases down a group
• **Electronegativity**: Increases across a period, decreases down a group

**Why is it Important?**
• Predicts chemical behavior
• Helps understand bonding patterns
• Guides discovery of new elements
• Essential for chemical calculations

**Fun Facts:**
• Dmitri Mendeleev created the first version in 1869
• He left gaps for undiscovered elements and predicted their properties
• The table has grown from 63 to 118+ known elements`;
  }

  // Math concepts
  if (lowerQuery.includes('calculus') || lowerQuery.includes('derivative')) {
    return `**Calculus: The Mathematics of Change**

Calculus is a branch of mathematics that deals with rates of change and accumulation. It's divided into two main areas: differential calculus and integral calculus.

**What is Calculus?**
Calculus studies how things change and accumulate. It's the mathematical tool for understanding motion, growth, optimization, and area/volume calculations.

**Differential Calculus (Derivatives):**
Focuses on rates of change - how fast something is changing at any given moment.

**The Derivative:**
The derivative of a function represents the instantaneous rate of change or the slope of the tangent line at any point.

**Basic Derivative Rules:**
• **Power Rule**: d/dx(xⁿ) = n·xⁿ⁻¹
• **Constant Rule**: d/dx(c) = 0
• **Sum Rule**: d/dx(f + g) = f' + g'
• **Product Rule**: d/dx(fg) = f'g + fg'
• **Chain Rule**: d/dx(f(g(x))) = f'(g(x))·g'(x)

**Common Derivatives:**
• d/dx(sin x) = cos x
• d/dx(cos x) = -sin x
• d/dx(eˣ) = eˣ
• d/dx(ln x) = 1/x

**Applications of Derivatives:**
• Finding maximum and minimum values
• Determining velocity and acceleration
• Optimization problems in business and engineering
• Analyzing the behavior of functions

**Integral Calculus:**
Focuses on accumulation - finding the total amount when you know the rate of change.

**Real-World Applications:**
• Physics: motion, forces, energy
• Economics: marginal cost and revenue
• Biology: population growth models
• Engineering: optimization and design

**Why Learn Calculus?**
Calculus is essential for understanding the physical world and is used in virtually every field of science and engineering.`;
  }

  // Default explanation for unknown topics
  return `**Understanding: ${query}**

Thank you for your question about "${query}". This is an interesting topic that deserves a comprehensive explanation.

**Core Concept:**
${query} is a fundamental concept in its respective field. Understanding this topic requires examining both its theoretical foundations and practical applications.

**Key Aspects to Consider:**
• **Definition**: What exactly is ${query} and how is it defined?
• **Components**: What are the main parts or elements involved?
• **Process**: How does it work or what steps are involved?
• **Applications**: Where and how is this concept used in real life?
• **Significance**: Why is this important to understand?

**Learning Approach:**
1. **Start with Basics**: Understand the fundamental definition and core principles
2. **Visual Learning**: Look for diagrams, charts, or visual representations
3. **Examples**: Study real-world examples and case studies
4. **Practice**: Apply the concept through problems or exercises
5. **Connections**: See how it relates to other concepts you know

**Study Tips:**
• Break complex concepts into smaller, manageable parts
• Use analogies to relate new information to familiar concepts
• Create your own examples to test understanding
• Teach the concept to someone else to reinforce learning
• Practice regularly to build confidence

**Further Exploration:**
Consider exploring related topics and advanced applications of ${query} to deepen your understanding. Look for academic resources, textbooks, and online materials that provide more detailed explanations.

**Remember:** Learning is a process, and it's normal to need multiple exposures to a concept before fully understanding it. Keep asking questions and seeking clarification when needed!`;
}