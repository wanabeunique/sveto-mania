import { deleteAsync } from 'del'

export const reset = async () => {
  return deleteAsync(app.path.clean)
}