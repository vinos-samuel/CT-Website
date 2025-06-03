"use client"

import { useMemo } from "react"

interface ArticleRendererProps {
  content: any
}

export function ArticleRenderer({ content }: ArticleRendererProps) {
  const renderContent = useMemo(() => {
    if (!content || !content.content) {
      return <p>No content available.</p>
    }

    const renderNode = (node: any, index: number) => {
      switch (node.type) {
        case "paragraph":
          return (
            <p key={index} className="mb-4">
              {node.content?.map((child: any, i: number) => renderInlineContent(child, i))}
            </p>
          )
        case "heading":
          const HeadingTag = `h${node.attrs?.level}` as keyof JSX.IntrinsicElements
          return (
            <HeadingTag key={index} className="mt-6 mb-4 font-bold">
              {node.content?.map((child: any, i: number) => renderInlineContent(child, i))}
            </HeadingTag>
          )
        case "bulletList":
          return (
            <ul key={index} className="list-disc pl-6 mb-4">
              {node.content?.map((child: any, i: number) => renderNode(child, i))}
            </ul>
          )
        case "orderedList":
          return (
            <ol key={index} className="list-decimal pl-6 mb-4">
              {node.content?.map((child: any, i: number) => renderNode(child, i))}
            </ol>
          )
        case "listItem":
          return (
            <li key={index} className="mb-1">
              {node.content?.map((child: any, i: number) => renderNode(child, i))}
            </li>
          )
        case "image":
          return (
            <div key={index} className="my-6">
              <img
                src={node.attrs?.src || "/placeholder.svg"}
                alt={node.attrs?.alt || ""}
                className="rounded-md max-w-full"
              />
            </div>
          )
        case "codeBlock":
          return (
            <pre key={index} className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto mb-4">
              <code>{node.content?.map((child: any, i: number) => renderInlineContent(child, i))}</code>
            </pre>
          )
        case "blockquote":
          return (
            <blockquote key={index} className="border-l-4 border-slate-300 pl-4 italic my-4">
              {node.content?.map((child: any, i: number) => renderNode(child, i))}
            </blockquote>
          )
        default:
          if (node.content) {
            return <div key={index}>{node.content.map((child: any, i: number) => renderNode(child, i))}</div>
          }
          return null
      }
    }

    const renderInlineContent = (node: any, index: number) => {
      if (node.type === "text") {
        let content = node.text

        if (node.marks) {
          node.marks.forEach((mark: any) => {
            switch (mark.type) {
              case "bold":
                content = <strong key={index}>{content}</strong>
                break
              case "italic":
                content = <em key={index}>{content}</em>
                break
              case "code":
                content = (
                  <code key={index} className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                    {content}
                  </code>
                )
                break
              case "link":
                content = (
                  <a
                    key={index}
                    href={mark.attrs?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {content}
                  </a>
                )
                break
            }
          })
        }
        return content
      }
      return null
    }

    return content.content.map(renderNode)
  }, [content])

  return <div className="article-content">{renderContent}</div>
}
