import { defineConfig, defineCollection, s } from 'velite'
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import { visit } from 'unist-util-visit';

const computedFields = <T extends { slug: string }>(data: T) => ({
    ...data,
    slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const posts = defineCollection({
    name: "Post",
    pattern: "post/**/*.mdx",
    schema: s.object({
        slug: s.path(),
        title: s.string().max(99),
        description: s.string().max(999).optional(),
        date: s.isodate(),
        category: s.string().max(255).optional(),
        related: s.string().array().optional(),
        published: s.boolean().default(true),
        body: s.mdx(),
    })
        .transform(computedFields)
})

const postsForSearch = defineCollection({
    name: "Post2",
    pattern: "post/**/*.mdx",
    schema: s.object({
        slug: s.path(),
        title: s.string().max(99),
        description: s.string().max(999).optional(),
        date: s.isodate(),
        category: s.string().max(255).optional(),
        published: s.boolean().default(true),
    })
        .transform(computedFields)
})

export default defineConfig({
    root: "content",
    output: {
        data: ".velite",
        assets: "public/static",
        base: "/static/",
        name: "[name]-[hash:6].[ext]",
        clean: true
    },
    collections: { posts, postsForSearch },
    mdx: {
        rehypePlugins: [
            () => (tree) => {
                visit(tree, (node) => {
                    if (node?.type === "element" && node?.tagName === "pre") {
                    const [codeEl] = node.children;
            
                    if (codeEl.tagName !== "code") return;

                    node.raw = codeEl.children?.[0].value;
                    }
                });
            },
            rehypeSlug, 
            [
                rehypePrettyCode, 
                { 
                    theme: "one-dark-pro" 
                }
            ], 
            () => (tree) => {
                visit(tree, (node) => {
                    if (node?.type === "element" && node?.tagName === "figure") {
                        if (!("data-rehype-pretty-code-figure" in node.properties)) {
                            return;
                        }
                        for (const child of node.children) {
                            if (child.tagName === "pre") {
                                child.properties["raw"] = node.raw;
                            }
                        }
                    }
                });
            },
            [
                rehypeAutoLinkHeadings, 
                { 
                    behavior: "wrap", 
                    properties: { 
                        className: ["subheading"],
                        ariaLabel: "Link to section"
                    } 
                }
            ]
        ],
        remarkPlugins: [],
    }
})
