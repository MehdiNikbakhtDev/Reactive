using System.Threading.Tasks;
using mehdi.App.Photos;
using Microsoft.AspNetCore.Http;

namespace mehdi.App.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AppPhoto(IFormFile file);
        Task<string> DeletePhoto(string publicId);
    }
}