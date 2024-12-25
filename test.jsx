<div className="bg-[#fbe5d6] text-center  py-2 border-[2px] rounded-lg border-white ">
              Details
            </div>

            <div className="flex flex-col lg:flex-row items-center space-x-1">
              <label
                htmlFor="name"
                className="border-2 border-black -mr-[1px] pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                <span> Name</span>
              </label>
              <input
                className="p-2 border-black border-2 rounded-lg w-full"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex mt-[2px] flex-col lg:flex-row  space-x-1">
              <label
                htmlFor="address"
                className="border-2 border-black -mr-[1px] pl-2 py-[8px] rounded-lg w-fit h-fit lg:w-[12vw]"
              >
                <span> Address</span>
              </label>
              <textarea
                className="p-2 border-black border-2 rounded-lg w-full h-20 "
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="flex flex-col lg:flex-row items-center space-x-1 mt-[2px]">
              <label
                htmlFor="state"
                className="border-2 border-black -mr-[1px] pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                <span> State</span>
              </label>
              <select
                className="p-2 border-black border-2 rounded-lg w-full"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a state
                </option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col lg:flex-row items-center space-y-2 mt-[2px] lg:space-y-0 lg:space-x-[4px] w-full">
              <label
                htmlFor="name"
                className="border-2 border-black pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                Pin Code
              </label>
              <div className="flex flex-col lg:flex-row space-x-[2px]  flex-grow w-full">
                <input
                  className="p-2 border-black border-2 rounded-lg flex-grow"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-2 border-black border-2 rounded-lg flex-grow"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Country"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center space-y-2 mt-[2px] lg:space-y-0 lg:space-x-[4px] w-full">
              <label
                htmlFor="mobile"
                className="border-2 border-black pl-2 py-[8px] rounded-lg w-fit lg:w-[13.6vw]"
              >
                Mobile
              </label>

              <select
                name="countryCode"
                className="border-2 border-black pl-2 py-[8px] rounded-lg w-fit"
                id="countryCode"
              >
                <option value="91">+91</option>
                {/* You can add more country codes as needed */}
                <option value="1">+1</option>
                <option value="44">+44</option>
                <option value="61">+61</option>
              </select>

              <div className="flex flex-col lg:flex-row space-x-[2px] flex-grow w-full">
                <input
                  className="p-2 border-black border-2 rounded-lg flex-grow"
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-2 border-black border-2 rounded-lg flex-grow"
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Telephone No."
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center space-y-2 mt-[2px] lg:space-y-0 lg:space-x-[4px] w-full">
              <label
                htmlFor="bankDetails"
                className="border-2 border-black pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                Bank Details
              </label>

              <div className="flex flex-col lg:flex-row space-x-[2px] flex-grow w-full">
                <select
                  name="bankDetails"
                  id="bankDetails"
                  className="border-2 border-black pl-2 py-[8px] rounded-lg w-full"
                  value={formData.bankDetails}
                  onChange={handleChange}
                >
                  <option value="">Bank Details</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>

                <input
                  className="p-2 border-black border-2 rounded-lg w-full"
                  type="text"
                  id="country"
                  name="country"
                  placeholder="IFSC Code"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center space-x-1 mt-[2px]">
              <label
                htmlFor="name"
                className="border-2 border-black -mr-[1px] pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                <span> Account No.</span>
              </label>
              <input
                className="p-2 border-black border-2 rounded-lg w-full"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col lg:flex-row items-center space-x-1 mt-[2px]">
              <label
                htmlFor="name"
                className="border-2 border-black -mr-[1px] pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                <span> Bank Name</span>
              </label>
              <input
                className="p-2 border-black border-2 rounded-lg w-full"
                type="text"
                id="name"
                name="name"
                placeholder="Bank Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="bg-[#fbe5d6] text-center  py-2 border-[2px] rounded-lg border-white ">
              Party Tax Details
            </div>

            <div className="flex flex-col lg:flex-row items-center space-x-1 mt-[2px]">
              <label
                htmlFor="name"
                className="border-2 border-black -mr-[1px] pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                <span>PAN NO.</span>
              </label>
              <input
                className="p-2 border-black border-2 rounded-lg w-full"
                type="text"
                id="name"
                name="name"
                placeholder="Bank Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col lg:flex-row items-center space-x-1 mt-[2px]">
              <span className="border-2 border-black -mr-[1px] pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]">
                GST Type:
              </span>
              <div className="p-2 border-black border-2 rounded-lg w-full flex items-center gap-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gstType"
                    value="Regular"
                    checked={formData.gstType === "Regular"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Regular
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gstType"
                    value="Composition"
                    checked={formData.gstType === "Composition"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Composition
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gstType"
                    value="Unregistered"
                    checked={formData.gstType === "Unregistered"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Unregistered
                </label>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center space-x-1 mt-[2px]">
              <label
                htmlFor="name"
                className="border-2 border-black -mr-[1px] pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                <span>GSTIN/UIN</span>
              </label>
              <input
                className="p-2 border-black border-2 rounded-lg w-full"
                type="text"
                id="name"
                name="name"
                placeholder="GSTIN/UIN"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>