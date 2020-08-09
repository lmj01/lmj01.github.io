function parseIncludes( string ) {

	var pattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
	
	console.log('type is ', typeof string);

	function replace( match, include ) {

		var replace = 
			ShaderChunk[ include ];
			//'the replace str';
		console.log('replace--',match);
		console.log('replace--',include);

		if ( replace === undefined ) {

			//throw new Error( 'Can not resolve #include <' + include + '>' );
			console.log('Can not resolve #include <' + include + '>');
			return '';
		}

		return parseIncludes( replace );

	}
	
	return string.replace( pattern, replace );

}

let ShaderChunk = {
	test: `#include <test2> \nstatic int a;`,
	test2: `final int result;`,
};

let str1 = `
#include <test3>
#include <test2>
#include <test>
int main() {
	return 0;
}
`;
let res = parseIncludes(str1);
console.log('result is :', res);

