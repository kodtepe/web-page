const AboutPage = () => {
  return (
    <div>
      <h1 className="p-4 text-3xl font-bold text-center text-white bg-black">
        Hakkımızda
      </h1> 
      <div className=" flex flex-col md:flex-row justify-center gap-10 p-10">
            <div className="w-full  h-auto bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold text-black text-center">
                Biz Kimiz ?
              </h2>
              <p className="text-gray-800">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet eveniet quis quam magnam provident. Deserunt doloremque reprehenderit quae animi esse architecto praesentium quam voluptates minus nostrum, nihil delectus! Minus, debitis sint? Necessitatibus libero maiores doloremque, similique quasi qui cumque perspiciatis tenetur mollitia itaque quia incidunt voluptatem. Tempora consequuntur velit odio iste deleniti culpa recusandae, iusto cupiditate id fugiat eaque libero dolorum voluptas reiciendis provident odit corporis. Molestias enim ducimus 
                </p>
            </div>
            <div className="w-full h-auto bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold text-black text-center">
                Nasıl Kurulduk ?
              </h2>
              <p className="text-gray-800 text-3xl">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet eveniet quis quam magnam provident. Deserunt doloremque reprehenderit quae animi esse architecto praesentium quam voluptates minus nostrum, nihil delectus!
                </p>
            </div>
            <div className="w-full h-[520px] bg-white shadow-lg rounded-lg bg-black opacity-80">
            <img className="w-full h-[520px] object-cover rounded-lg " src="/coding2.jpg" alt="Contact" />
            </div>
            
          </div>
    </div>
  );
};
export default AboutPage;
