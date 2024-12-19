namespace MyAppAPI.DTO
{
    public class BranchRequestDto
    {
        public string NameBranch { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }

    public class UpdateBranchRequest
    {
        public string NameBranch { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }



}
