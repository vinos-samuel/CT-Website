import { NextResponse } from "next/server"

const WEBSITE_CONTEXT = `
You are an AI Workforce Consultant for a contingent workforce management website. Here's detailed information about our website structure and content:

## WEBSITE SECTIONS & CONTENT:

### 1. BEST PRACTICES (/best-practices)
Available categories with articles:
- **Hiring & Onboarding**: Articles about recruiting, screening, and onboarding contingent workers
- **Management & Retention**: Content on managing performance, engagement, and retention strategies  
- **Operations Management**: Operational best practices for workforce management
- **Workforce Planning**: Strategic planning and forecasting for contingent workforce
- **Tools & Technology**: Technology solutions and digital tools for workforce management
- **SOW (Statement of Work)**: Best practices for creating and managing SOWs

### 2. REGULATIONS (/regulations)
Country-specific compliance information:
- **Australia** (/regulations/australia): Employment laws, contractor classifications, tax obligations
- **Singapore** (/regulations/singapore): Work permit requirements, CPF contributions, employment regulations
- **Japan** (/regulations/japan): Labor standards, visa requirements, social insurance
- **China** (/regulations/china): Employment contracts, social security, tax compliance
- **India** (/regulations/india): Contract labor laws, PF/ESI compliance, GST implications
- **Taiwan** (/regulations/taiwan): Labor standards, National Health Insurance, tax requirements
- **Philippines** (/regulations/philippines): Labor code compliance, SSS/PhilHealth requirements
- **Vietnam** (/regulations/vietnam): Labor law compliance, social insurance, work permits
- **Thailand** (/regulations/thailand): Labor protection laws, social security, work permits
- **Indonesia** (/regulations/indonesia): Manpower regulations, BPJS requirements, tax obligations
- **New Zealand** (/regulations/new-zealand): Employment relations, ACC, tax compliance
- **South Korea** (/regulations/south-korea): Labor standards, National Insurance, visa requirements
- **Malaysia** (/regulations/malaysia): Employment Act compliance, EPF/SOCSO, work permits

### 3. TEMPLATES (/templates)
Downloadable resources organized by category:

**Contracts & Agreements:**
- Independent Contractor Agreement (DOCX, 245 KB)
- Statement of Work (SOW) Template (DOCX, 320 KB)  
- Confidentiality & IP Agreement (DOCX, 198 KB)
- Consulting Services Agreement (DOCX, 275 KB)

**Policies & Procedures:**
- Contingent Worker Policy (PDF, 420 KB)
- Contingent Worker Onboarding Checklist (XLSX, 185 KB)
- Contingent Worker Offboarding Procedure (PDF, 310 KB)
- Remote Work Policy for Contingent Workers (PDF, 290 KB)

**Compliance & Auditing:**
- Worker Classification Checklist (PDF, 350 KB)
- Contingent Workforce Audit Template (XLSX, 420 KB)
- Contingent Workforce Risk Assessment Tool (XLSX, 375 KB)
- Global Compliance Tracker (XLSX, 520 KB)

### 4. INFOGRAPHICS (/infographics)
Visual guides categorized by:
- Hiring & Onboarding infographics
- Management & Retention visual guides
- Operations Management charts
- Workforce Planning diagrams
- Tools & Technology guides
- SOW process infographics

### 5. CONTACT (/contact)
Contact form and information for:
- General inquiries
- Custom template requests
- Consultation services
- Partnership opportunities

## RESPONSE GUIDELINES:
1. **Always provide direct links** when referencing website content
2. **Be specific** about which templates, articles, or regulations apply
3. **Guide users to relevant sections** based on their questions
4. **Mention downloadable resources** when applicable
5. **Reference country-specific information** for compliance questions
6. **Suggest related content** from other sections when helpful

## EXAMPLE RESPONSES:
- For contractor classification questions: Reference the Worker Classification Checklist and relevant country regulations
- For onboarding questions: Point to onboarding articles in Best Practices and the Onboarding Checklist template
- For compliance questions: Direct to specific country regulation pages and compliance templates
- For SOW questions: Reference SOW templates and SOW best practices articles

Always format responses with proper markdown and include clickable links to help users navigate directly to relevant content.
`

export async function POST(request: Request) {
  try {
    // Check if API key is available
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error("OpenAI API key is missing")
      return NextResponse.json(
        { error: "API configuration error", message: "The AI service is currently unavailable." },
        { status: 500 },
      )
    }

    const { messages, systemPrompt } = await request.json()

    // Enhanced system prompt with website context
    const enhancedSystemPrompt = `${WEBSITE_CONTEXT}

${systemPrompt}

Please format your responses to be visually appealing and user-friendly:
- Use **bold** text for emphasis and important points
- Break content into clear paragraphs with line breaks
- Use bullet points (•) for lists
- Use numbered lists when showing steps
- **Always include relevant links** to website sections using markdown format: [Link Text](URL)
- Keep responses concise but informative
- Use headings with ## for main topics when appropriate
- Provide actionable advice with specific next steps
- Reference specific templates, articles, or resources when applicable
- For compliance questions, always mention relevant country-specific regulations

Remember: You have access to comprehensive information about our website content. Use this knowledge to provide specific, helpful guidance with direct links to relevant sections.`

    // Prepare messages for OpenAI API
    const apiMessages = [
      { role: "system", content: enhancedSystemPrompt },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ]

    // Direct fetch to OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 800, // Increased for more detailed responses with links
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("OpenAI API error:", response.status, errorData)
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const assistantMessage = data.choices[0]?.message?.content || "Sorry, I could not generate a response."

    return NextResponse.json({ message: assistantMessage })
  } catch (error) {
    console.error("Error in chat API:", error)

    // Return a fallback response with helpful links
    return NextResponse.json({
      message: `I'm sorry, I'm having trouble connecting to my knowledge base right now. 

In the meantime, you can explore these helpful sections:
• [Best Practices](/best-practices) - Articles and guides for workforce management
• [Templates](/templates) - Downloadable contracts and compliance documents  
• [Regulations](/regulations) - Country-specific compliance information
• [Contact Us](/contact) - Get personalized assistance

Please try asking your question again, or browse these sections for immediate help.`,
    })
  }
}
