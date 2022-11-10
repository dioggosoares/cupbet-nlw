// ENCURTA QUALQUER STRING E ADICIONA RETICÊNCIAS, DEFINA A STRING A SER ENCURTADA E DEPOIS QUANTOS CARACTERES LIMITE
export function shortenString(str: string, limit: number) {
  // se astring é menor do que ou igual ao limit
  // só retorna a string sem o truncate.
  if (str?.length <= limit) {
    return str
  }
  // Retorna a string com truncat '...' concatenado com a string.
  return str?.slice(0, limit) + '...'
}

export function capitalizeLetters(str: string) {
  return str.replace(/[^A-Z]+/g, '')
}
