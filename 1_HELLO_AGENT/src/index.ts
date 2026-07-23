import helloGemini from "./provider";

async function main() {
  try {
    const result = await helloGemini();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

main();