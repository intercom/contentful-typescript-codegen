export default function renderNamespace(source: string, namespace: string | null) {
  if (!namespace) return source

  return `
    declare namespace ${namespace} {
    ${source}
    }

    export as namespace ${namespace}
    export=${namespace}
  `
}
