import { GithubOptionsBase, GithubOptionsUpdate, RepoDetailsRes } from "@/core/application/interfaces/services/octokit";
import { octokitGithubRepository } from "@/core/infrastructure/services/octokit-github";

export async function getGithubReposDetailsUC(owner: string): Promise<RepoDetailsRes>{
    return await octokitGithubRepository.getReposDetails(owner)
}
export async function updateGithubFileContentUC(filePath: string,baseOptions: GithubOptionsBase ,updateOptions: GithubOptionsUpdate, maxRetries?: number): Promise<void>{
    return await octokitGithubRepository.updateFileContent(filePath, baseOptions, updateOptions, maxRetries )
}
export async function getTechGithubPercentageUC (nameId: string, owner: string):Promise<number> {
    return await octokitGithubRepository.getTechGithubPercentage(nameId, owner)
}