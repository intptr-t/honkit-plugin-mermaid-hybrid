## Mermaid plugin for GitBook

Plugin for [GitBook](https://github.com/GitbookIO/gitbook) 3 which renders [Mermaid](https://mermaid-js.github.io/mermaid) diagrams and flow charts detected in the book markdown.  

💚 **THIS PLUGIN WAS BORN TO USING MERMAID V8.5 AND LATER AT GITBOOK** 💚


### Support status

#### Working
- Flowcharts
- Sequence diagrams
- Gantt diagrams
- Git graph - experimental at v8.5
- Entity Relationship Diagrams - experimental at v8.5
- State diagrams
- Pie chart diagrams

#### Not Working yet
- Class diagrams - experimental at v8.5


### How to install it?

You can use install via **NPM** / **yarn**:

```bash
$ npm install gitbook-plugin-mermaid-newface
# or
$ yarn add gitbook-plugin-mermaid-newface
```

And use it for your book with in the book.json:

```json
{
  "plugins": ["mermaid-newface"]
}
```

### How to use it?

Just put the code into fenced code block and tag it **mermaid** key word like this:

```mermaid
sequenceDiagram
    autonumber
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
```

```mermaid
stateDiagram
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
```

## Config

If you want to change the settings of mermaid, please add `pluginsConfig` in the book.json:

```json
{
  "plugins": ["mermaid-newface"],
  "pluginsConfig": {
    "mermaid-newface": {
      "theme": "neutral" // default, forest, dar, natural. see https://mermaid-js.github.io/mermaid/#/mermaidAPI?id=theme
    }
  }
}
```


