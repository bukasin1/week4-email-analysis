import FileTree from './fileTree';

export function createFileTree(input) {

  let index = input.findIndex(item => !item.parentId)
  let sort = input.filter(item => item.parentId).sort((a,b) => a.id - b.id)
  let inputCopy = [input[index], ...sort]
  const fileTree = new FileTree();

  for (const inputNode of inputCopy) {
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }

  return fileTree;
}