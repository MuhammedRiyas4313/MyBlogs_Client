const Loader = () => (
    <div>
        <div className="flex">
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50">
                <div
                    className="w-12 h-12 rounded-full absolute
                            border-4 border-dashed border-gray-200"
                ></div>
                <div
                    className="w-12 h-12 rounded-full animate-spin absolute
                            border-4 border-dashed border-primary border-t-transparent"
                ></div>
            </div>
        </div>
    </div>
);

export default Loader;
